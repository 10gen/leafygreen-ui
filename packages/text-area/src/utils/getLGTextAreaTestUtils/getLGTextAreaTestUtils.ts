import { getByLgId, queryByQuerySelector } from '@lg-tools/test-harnesses';

import { LGID_DESCRIPTION, LGID_LABEL } from '@leafygreen-ui/typography';

import { LGID_TEXT_AREA, LGID_TEXT_AREA_ERROR_MESSAGE } from '../../constants';

import { LGTextAreaTestUtilsReturnType } from './getLGTextAreaTestUtils.types';

export const getLGTextAreaTestUtils = (
  lgId = LGID_TEXT_AREA,
): LGTextAreaTestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const label = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid=${LGID_LABEL}]`,
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid=${LGID_DESCRIPTION}]`,
  );

  /**
   * Queries the `element` for the input element. Will return `null` if the input is not found.
   */
  const input = queryByQuerySelector<HTMLTextAreaElement>(
    element,
    `textarea`,
  ) as HTMLTextAreaElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid="${LGID_TEXT_AREA_ERROR_MESSAGE}"]`,
  );

  /**
   * Returns the disabled attribute on the input.
   */
  const isInputDisabled = () => {
    return input.disabled;
  };

  /**
   * Returns the input value.
   */
  const getInputValue = () => {
    return input.value;
  };

  /**
   * Queries the `element` for `aria-invalid`.
   */
  const isError = () => {
    const ariaInvalid = queryByQuerySelector<SVGElement>(
      element,
      'textarea[aria-invalid="true"]',
    );

    return !!ariaInvalid;
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
      getInputValue: () => getInputValue(),
    },
  };
};
