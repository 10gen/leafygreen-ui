import { act, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { Variant } from '../../Toast.types';
import { ToastId } from '../ToastContext.types';

import { useToastReducer } from '.';

describe('packages/toast/useToastReducer', () => {
  afterEach(cleanup);

  test('returns the expected stack & functions', () => {
    const { result } = renderHook(useToastReducer);
    const { stack, pushToast, popToast, updateToast, getToast, clearStack } =
      result.current;

    expect(stack).toBeDefined();
    expect(stack.size).toBe(0);
    expect(pushToast).toBeDefined();
    expect(popToast).toBeDefined();
    expect(updateToast).toBeDefined();
    expect(getToast).toBeDefined();
    expect(clearStack).toBeDefined();
  });

  describe('pushToast', () => {
    test('pushes a toast to the stack', async () => {
      const { result, rerender } = renderHook(useToastReducer);
      let toastId: ToastId = '';
      act(() => {
        toastId = result.current.pushToast({ title: 'test' });
      });
      rerender();
      const { stack } = result.current;
      const toast = stack.get(toastId);
      expect(toast).toBeDefined();
      expect(toast).toStrictEqual(expect.objectContaining({ title: 'test' }));
    });
  });

  describe('getToast', () => {
    test('returns the requested toast', () => {
      const { result, rerender } = renderHook(useToastReducer);
      let toastId: ToastId = '';
      act(() => {
        toastId = result.current.pushToast({ title: 'test' });
      });
      rerender();
      const toast = result.current.getToast(toastId);
      expect(toast).toBeDefined();
      expect(toast).toStrictEqual(expect.objectContaining({ title: 'test' }));
    });
  });

  describe('popToast', () => {
    test('removes toast from the stack', () => {
      const { result, rerender } = renderHook(useToastReducer);
      let toastId: ToastId = '';
      act(() => {
        toastId = result.current.pushToast({ title: 'test' });
      });
      rerender();
      act(() => {
        result.current.popToast(toastId);
      });
      rerender();
      const { stack } = result.current;
      const toast = stack.get(toastId);
      expect(toast).not.toBeDefined();
    });
  });

  describe('updateToast', () => {
    test('updates the progress variable', () => {
      const { result, rerender } = renderHook(useToastReducer);
      let toastId: ToastId = '';
      act(() => {
        toastId = result.current.pushToast({
          title: 'test',
          variant: Variant.Progress,
          progress: 0,
        });
      });
      rerender();
      act(() => {
        result.current.updateToast({ id: toastId, props: { progress: 0.5 } });
      });
      rerender();

      const { stack } = result.current;
      const toast = stack.get(toastId);
      expect(toast).toBeDefined();
      expect(toast).toStrictEqual(expect.objectContaining({ progress: 0.5 }));
    });
  });

  describe('clearStack', () => {
    test('clears the stack', () => {
      const { result, rerender } = renderHook(useToastReducer);
      act(() => {
        result.current.pushToast({ title: 'test' });
      });
      rerender();

      act(() => {
        result.current.clearStack();
      });
      rerender();

      expect(result.current.stack.size).toBe(0);
    });
  });
});
