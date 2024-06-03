import { AriaLabelPropsWithChildren } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';

/**
 * TERMINOLOGY
 *
 * `focused`: The element is "focused" via keyboard navigation
 * (Does not mean `:focus`, since input options are not focused in this sense)
 *
 * `active`: The element is selected, or otherwise active (including `:active`)
 */
export interface BaseInputOptionProps {
  /**
   * Prevents the option from being selectable.
   * @default false
   */
  disabled?: boolean;

  /**
   * Defines the currently highlighted option,
   * and applies the relevant styles and aria attributes.
   *
   * Functionally similar to `:focus` state, however highlight not always implemented with true browser focus state
   * (e.g. some components maintain the browser focus on the trigger element,
   * and identify the "highlighted" option with the `aria-selected` attribute).
   *
   * Not to be confused with `checked`, which identifies the currently active/selected option.
   * @default false
   */
  highlighted?: boolean;

  /**
   * Defines the currently selected/active element, regardless of interaction state.
   *
   * Functionally similar to a checkbox/radio's `checked` attribute,
   * this identifies an option as currently selected.
   *
   */
  checked?: boolean;

  /**
   * Whether a wedge displays on the left side of the item
   * when the element is highlighted or selected
   * @default true
   */
  showWedge?: boolean;

  /**
   * Determines whether to show hover, highlight and selected styles
   * @default true
   */
  isInteractive?: boolean;
}

export type InputOptionProps = DarkModeProps &
  AriaLabelPropsWithChildren &
  BaseInputOptionProps;
