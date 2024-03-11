import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from '../../TextArea';

import { getLGTextAreaUtils } from './getLGTextAreaUtils';

const renderTextAreaAsync = () =>
  renderAsyncTest(<TextArea label="textarea label" />, render);

function renderMultipleInputs() {
  render(
    <>
      <TextArea
        data-lgid="lg-text_area-1"
        label="label 1"
        value="text input 1"
      />
      <TextArea
        data-lgid="lg-text_area-2"
        label="label 2"
        value="text input 2"
      />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGTextAreaUtils('lg-text_area-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGTextAreaUtils('lg-text_area-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/text-input', () => {
  describe('getLGTextAreaUtils', () => {
    describe('throws error if LG TextArea is not found', () => {
      test('', () => {
        render(<TextArea data-lgid="lg-text_output" label="hey" />);

        try {
          // eslint-disable-next-line
          const { elements } = getLGTextAreaUtils('lg-text_area');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(/Unable to find an element by: /),
          );
        }
      });
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getInput()).toBeInTheDocument();
        expect(elementsTwo.getInput()).toBeInTheDocument();
      });

      test('inputValue', () => {
        const { utilsOne, utilsTwo } = renderMultipleInputs();

        expect(utilsOne.inputValue()).toBe('text input 1');
        expect(utilsTwo.inputValue()).toBe('text input 2');
      });
    });

    describe('LG Modal', () => {
      test('find LG TextArea after awaiting an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextAreaAsync();

        userEvent.click(openButton);

        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text area
        const {
          elements: { getInput },
        } = getLGTextAreaUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextArea awaiting getLGTextAreaUtils', async () => {
        const { openButton } = renderTextAreaAsync();

        userEvent.click(openButton);

        // awaiting getLGTextAreaUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGTextAreaUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside a LG Modal', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextAreaAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text area
        const {
          elements: { getInput },
          utils: { inputValue },
        } = getLGTextAreaUtils();
        const input = getInput();
        userEvent.type(input, 'whats blue and not heavy? light blue');
        expect(inputValue()).toBe('whats blue and not heavy? light blue');
      });
    });
  });
});