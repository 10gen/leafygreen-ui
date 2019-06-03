import React, { useEffect } from 'react';
import { act, renderHook } from 'react-hooks-testing-library';
import { render, cleanup } from 'react-testing-library';
import {
  useDocumentEventListener,
  useElementNode,
  useViewportSize,
} from './index';

afterAll(cleanup);

describe('packages/hooks', () => {
  describe('useDocumentEventListener', () => {
    test('event callback should fire when enabled is true', () => {
      const eventCallback = jest.fn();

      renderHook(() => useDocumentEventListener('click', eventCallback));

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);
    });

    test('event callback should not fire when enabled is false', () => {
      const eventCallback = jest.fn();

      renderHook(() =>
        useDocumentEventListener({
          type: 'click',
          eventCallback,
          enabled: false,
        }),
      );

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(0);
    });
  });

  describe.skip('useMutationObserver', () => {}); //eslint-disable-line jest/no-disabled-tests

  describe('useElementNode', () => {
    let count = 1;

    function TestUseElementNode() {
      const [refEl, setRefEl] = useElementNode();
      useEffect(() => {
        count += 1;
      }, [refEl]);
      return <div ref={setRefEl} />;
    }

    render(<TestUseElementNode />);

    test('it gets called twice', () => {
      expect(count).toEqual(2);
    });

    const { result } = renderHook(() => useElementNode());

    test('returns an array where the first element refers to the ref node', () => {
      expect(result.current[0] === null).toBe(true);
    });

    test('returns an array where the second element is a callback to update the ref node', () => {
      expect(typeof result.current[1]).toBe('function');
    });
  });

  describe('useViewportSize', () => {
    const { result, rerender } = renderHook(() => useViewportSize());

    test('returns updated width', () => {
      act(() => {
        window.innerWidth = 1024;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      expect(result.current.width).toBe(1024);
      act(() => {
        window.innerWidth = 769;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      expect(result.current.width).toBe(769);
    });

    test('returns updated height', () => {
      act(() => {
        window.innerHeight = 768;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      expect(result.current.height).toBe(768);

      act(() => {
        window.innerHeight = 1024;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      expect(result.current.height).toBe(1024);
    });
  });
});
