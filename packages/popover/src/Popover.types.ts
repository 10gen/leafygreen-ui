import React from 'react';
import { Transition } from 'react-transition-group';

import { HTMLElementProps } from '@leafygreen-ui/lib';

type TransitionProps = React.ComponentProps<typeof Transition<HTMLElement>>;

type TransitionLifecycleCallbacks = Pick<
  TransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;

/**
 * Options to determine the alignment of the popover relative to
 * the other component
 * @param Top will align content above other element
 * @param Bottom will align content below other element
 * @param Left will align content to the left of other element
 * @param Right will align content to the right of other element
 */
const Align = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  CenterVertical: 'center-vertical',
  CenterHorizontal: 'center-horizontal',
} as const;

type Align = (typeof Align)[keyof typeof Align];

export { Align };

/**
 * Options to determine the justification of the popover relative to
 * the other component
 * @param Start will justify content against the start of other element
 * @param Middle will justify content against the middle of other element
 * @param End will justify content against the end of other element
 * @param Fit will justify content against both the start and the end of the other element
 */
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
  Fit: 'fit',
} as const;

type Justify = (typeof Justify)[keyof typeof Justify];

export { Justify };

export interface ElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

export interface ChildrenFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

export type PortalControlProps =
  | {
      /**
       * Specifies that the popover content should be rendered at the end of the DOM,
       * rather than in the DOM tree.
       *
       * @default true
       * @deprecated
       */
      usePortal?: true;

      /**
       * When usePortal is `true`, specifies a class name to apply to the root element of the portal.
       * @deprecated
       */
      portalClassName?: string;

      /**
       * When usePortal is `true`, specifies an element to portal within. The default behavior is to generate a div at the end of the document to render within.
       * @deprecated
       */
      portalContainer?: HTMLElement | null;

      /**
       * A ref for the portal element
       * @deprecated
       */
      portalRef?: React.MutableRefObject<HTMLElement | null>;

      /**
       * When usePortal is `true`, specifies the scrollable element to position relative to.
       */
      scrollContainer?: HTMLElement | null;
    }
  | {
      /**
       * Specifies that the popover content should be rendered at the end of the DOM,
       * rather than in the DOM tree.
       *
       * @default true
       * @deprecated
       */
      usePortal: false;

      /**
       * When usePortal is `true`, specifies a class name to apply to the root element of the portal.
       * @deprecated
       */
      portalClassName?: undefined;

      /**
       * When usePortal is `true`, specifies an element to portal within. The default behavior is to generate a div at the end of the document to render within.
       * @deprecated
       */
      portalContainer?: null;

      /**
       * A ref for the portal element
       * @deprecated
       */
      portalRef?: undefined;

      /**
       * When usePortal is `true`, specifies the scrollable element to position relative to.
       */
      scrollContainer?: null;
    };

/**
 * Base popover props.
 * Use these props to extend popover behavior
 */
export type PopoverProps = {
  /**
   * Content that will appear inside of the popover component.
   */
  children:
    | React.ReactNode
    | ((Options: ChildrenFunctionParameters) => React.ReactNode);

  /**
   * Determines the active state of the popover component
   *
   * default: `false`
   */
  active?: boolean;

  /**
   * Class name applied to popover container.
   */
  className?: string;

  /**
   * Determines the alignment of the popover content relative to the trigger element
   *
   * default: `bottom`
   */
  align?: Align;

  /**
   * Determines the justification of the popover content relative to the trigger element
   *
   * default: `start`
   */
  justify?: Justify;

  /**
   * A reference to the element against which the popover component will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `10`
   */
  spacing?: number;

  /**
   * Should the Popover auto adjust its content when the DOM changes (using MutationObserver).
   *
   * default: false
   */
  adjustOnMutation?: boolean;

  /**
   * Click event handler passed to the root div element within the portal container.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Number that controls the z-index of the popover element directly.
   */
  popoverZIndex?: number;

  onToggle?: (e: ToggleEvent) => void;
} & PortalControlProps &
  TransitionLifecycleCallbacks;

export interface ToggleEvent extends Event {
  type: 'toggle';
  newState: 'open' | 'closed';
  oldState: 'open' | 'closed';
}

/** Props used by the popover component */
export type PopoverComponentProps = Omit<HTMLElementProps<'div'>, 'children'> &
  PopoverProps;

export interface UseReferenceElementReturnObj {
  /**
   * `HiddenPlaceholder` is used if `refEl` is undefined. The placeholder's parent is
   * used as the element against which the popover component will be positioned
   */
  HiddenPlaceholder: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Ref to access hidden placeholder element
   */
  placeholderRef: React.MutableRefObject<HTMLSpanElement | null>;

  /**
   * Element against which the popover component will be positioned
   */
  referenceElement: HTMLElement | null;

  /**
   * Boolean to determine if a hidden placeholder should be rendered
   */
  renderHiddenPlaceholder: boolean;
}

export interface UseContentNodeReturnObj {
  /**
   * `contentNode` is the direct child of the popover element and wraps the children. It
   * is used to calculate the position of the popover because its parent has a transition.
   * This prevents getting the width of the popover until the transition completes
   */
  contentNode: HTMLDivElement | null;

  /**
   * We shadow the `contentNode` onto this `contentNodeRef` as <Transition> from
   * react-transition-group only accepts useRef objects. Without this, StrictMode
   * warnings are produced by react-transition-group.
   */
  contentNodeRef: React.MutableRefObject<HTMLDivElement | null>;

  /**
   * `ContentWrapper` is used to wrap the children of the popover component. We need
   * an inner wrapper with a ref because placing the ref on the parent will create an
   * infinite loop in some cases when dynamic styles are applied.
   */
  ContentWrapper: React.ForwardRefExoticComponent<
    {
      children: React.ReactNode;
    } & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Dispatch method to attach `contentNode` to the `ContentWrapper`
   */
  setContentNode: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}

export type UsePopoverPositioningProps = Pick<
  PopoverProps,
  'active' | 'adjustOnMutation' | 'align' | 'justify' | 'scrollContainer'
> & {
  contentNode: HTMLDivElement | null;
  referenceElement: HTMLElement | null;
};
