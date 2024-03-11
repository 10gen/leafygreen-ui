import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from '../../TextInput';

import { getLGTextInputUtils } from './getLGTextInputUtils';

const renderTextInputAsync = () =>
  renderAsyncTest(<TextInput label="text input label" />, render);

function renderMultipleInputs() {
  render(
    <>
      <TextInput
        data-lgid="lg-text_input-1"
        label="label 1"
        value="text input 1"
      />
      <TextInput
        data-lgid="lg-text_input-2"
        label="label 2"
        value="text input 2"
      />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGTextInputUtils('lg-text_input-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGTextInputUtils('lg-text_input-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/text-input', () => {
  describe('getLGTextInputUtils', () => {
    describe('throws error if LG TextInput is not found', () => {
      test('', () => {
        render(<TextInput data-lgid="lg-text_output" label="hey" />);

        try {
          // eslint-disable-next-line
          const { elements } = getLGTextInputUtils();
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

    describe('Async', () => {
      test('find LG TextInput after awaiting async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextInputAsync();

        userEvent.click(openButton);

        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text input
        const {
          elements: { getInput },
        } = getLGTextInputUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextInput awaiting getLGTextInputUtils', async () => {
        const { openButton } = renderTextInputAsync();

        userEvent.click(openButton);

        // awaiting getLGTextInputUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGTextInputUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextInputAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text input
        const {
          elements: { getInput },
          utils: { inputValue },
        } = getLGTextInputUtils();
        const input = getInput();
        userEvent.type(input, 'leafygreen');
        expect(inputValue()).toBe('leafygreen');
      });
    });
  });
});