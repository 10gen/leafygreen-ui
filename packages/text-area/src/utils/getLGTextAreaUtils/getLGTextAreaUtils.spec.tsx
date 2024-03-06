import { getByLgId, getByQuerySelector } from '@lg-tools/test-harnesses';

import { LGTextAreaUtilsReturnType } from './getLGTextAreaUtils.types';

export const getLGTextAreaUtils = (
  lgId = 'lg-text_area',
): LGTextAreaUtilsReturnType => {
  /**
   * It's very unlikely that the `input` will not be found since it's always rendered
   */
  const noInputThrow = () => {
    const error = new Error(
      `Unable to find an LG TextArea by: [data-lgid="${lgId}"]`,
    );
    error.name = 'LeafyGreenElementError';
    if (!input) throw error;
  };

  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const label = getByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-text_area-label"]',
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = getByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-text_area-description"]',
  );

  /**
   * Queries the `element` for the input element. Will return `null` if the input is not found.
   */
  const input = getByQuerySelector<HTMLInputElement>(
    element,
    '[data-lgid="lg-text_area-input"]',
  );

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = getByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-text_area-error_message"]',
  );

  /**
   * Queries the `element` for aria-disabled.
   */
  const isInputDisabled = () => {
    noInputThrow();
    return (input as HTMLInputElement).disabled;
  };

  const inputValue = () => {
    noInputThrow();
    return (input as HTMLInputElement).value;
  };

  /**
   * Queries the `element` for the warning Icon.
   */
  const isError = () => {
    const warningIcon = getByQuerySelector<SVGElement>(
      element,
      'svg[aria-label="Warning Icon"]',
    );

    return !!warningIcon;
  };

  return {
    elements: {
      getLabel: () => label,
      getDescription: () => description,
      getInput: () => input,
      getErrorMessage: () => errorMessage,
    },
    utils: {
      isDisabled: () => isInputDisabled(),
      isError: () => isError(),
      inputValue: () => inputValue(),
    },
  };
};
