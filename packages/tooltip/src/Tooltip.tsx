import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useBackdropClick,
  useEscapeKey,
  useIdAllocator,
} from '@leafygreen-ui/hooks';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import Popover, {
  Align as PopoverAlign,
  ElementPosition,
  Justify,
  PopoverProps,
} from '@leafygreen-ui/popover';
import { BaseFontSize, fontFamilies } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import SvgNotch from './Notch';
import { borderRadius, notchWidth } from './tooltipConstants';
import { notchPositionStyles } from './tooltipUtils';

export const TriggerEvent = {
  Hover: 'hover',
  Click: 'click',
} as const;

type TriggerEvent = typeof TriggerEvent[keyof typeof TriggerEvent];

export const Align = {
  Top: PopoverAlign.Top,
  Bottom: PopoverAlign.Bottom,
  Left: PopoverAlign.Left,
  Right: PopoverAlign.Right,
} as const;

export type Align = typeof Align[keyof typeof Align];

export { Justify };

// The typographic styles below are largely copied from the Body component.
// We can't use the Body component here due to it rendering a paragraph tag,
// Which would conflict with any children passed to it containing a div.
const baseTypeStyle = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.gray.light1};
  font-weight: 400;
  width: 100%;
  overflow-wrap: anywhere;
`;

const baseStyles = css`
  display: flex;
  align-items: center;
  border-radius: ${borderRadius}px;
  padding: 12px ${borderRadius}px;
  box-shadow: 0px 2px 4px -1px ${transparentize(0.85, palette.black)};
  cursor: default;
  width: fit-content;
  max-width: 256px;
`;

const positionRelative = css`
  position: relative;
`;

const colorSet = {
  [Theme.Light]: {
    tooltip: css`
      background-color: ${palette.black};
      color: ${palette.gray.light1};
    `,
    children: css`
      color: inherit;
    `,
    notchFill: palette.black,
  },
  [Theme.Dark]: {
    tooltip: css`
      background-color: ${palette.gray.light2};
      color: ${palette.black};
    `,
    children: css`
      color: inherit;
    `,
    notchFill: palette.gray.light2,
  },
};

const minSize = notchWidth + 2 * borderRadius;
const minHeightStyle = css`
  min-height: ${minSize}px;
`;
interface PopoverFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

type ModifiedPopoverProps = Omit<PopoverProps, 'active' | 'adjustOnMutation'>;

export type TooltipProps = Omit<
  HTMLElementProps<'div'>,
  keyof ModifiedPopoverProps
> &
  ModifiedPopoverProps & {
    /**
     * A slot for the element used to trigger the `Tooltip`.
     */
    trigger?: React.ReactElement | Function;

    /**
     * Determines if a `hover` or `click` event will trigger the opening of a `Tooltip`.
     * @default 'hover'
     */
    triggerEvent?: TriggerEvent;

    /**
     * Controls component and determines the open state of the `Tooltip`
     * @default `false`
     */
    open?: boolean;

    /**
     * Callback to change the open state of the `Tooltip`.
     */
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * Whether the `Tooltip` will appear in dark mode.
     * @default false
     */
    darkMode?: boolean;

    /**
     * id given to `Tooltip` content.
     */
    id?: string;

    /**
     * Callback to determine whether or not `Tooltip` should close when user tries to close it.
     *
     */
    shouldClose?: () => boolean;

    /**
     * Enables Tooltip to trigger based on the event specified by `triggerEvent`.
     * @default true
     */
    enabled?: boolean;

    /**
     * Callback that is called when the tooltip is closed internally. E.g. on ESC press, on backdrop click, on blur.
     *
     */
    onClose?: () => void;

    /**
     * Allows consuming applications to override font-size as set by the LeafyGreen Provider.
     *
     */
    baseFontSize?: BaseFontSize;
  };

const stopClickPropagation = (evt: React.MouseEvent) => {
  evt.stopPropagation();
};

/**
 * # Tooltip
 *
 * Tooltip component
 *
 * ```
<Tooltip
  align='top'
  justify='start'
  trigger={<button>trigger</button>}
  triggerEvent='hover'
>
  I am an uncontrolled Tooltip!
</Tooltip>
```
 * @param props.children Content to appear inside of Tooltip.
 * @param props.open Boolean to describe whether or not Tooltip is open.
 * @param props.setOpen Callback to change the open state of the Tooltip.
 * @param props.darkMode Whether the Tooltip will appear in dark mode.
 * @param props.className Classname applied to Tooltip.
 * @param props.align Alignment of Tooltip relative to trigger: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Tooltip relative to trigger: `start`, `middle`, `end`.
 * @param props.trigger Trigger element can be ReactNode or function.
 * @param props.triggerEvent Whether the Tooltip should be triggered by a `click` or `hover`.
 * @param props.id id given to Tooltip content.
 * @param props.usePortal Determines whether or not Tooltip will be Portaled
 * @param props.portalClassName Classname applied to root element of the portal.
 * @param props.onClose Callback that is fired when the tooltip is closed.
 */
function Tooltip({
  open: controlledOpen,
  setOpen: controlledSetOpen,
  darkMode: darkThemeProp,
  baseFontSize: baseFontSizeOverride,
  triggerEvent = TriggerEvent.Hover,
  enabled = true,
  align = 'top',
  justify = 'start',
  spacing = 12,
  usePortal = true,
  onClose = () => {},
  id,
  shouldClose,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  refEl,
  className,
  children,
  trigger,
  ...rest
}: TooltipProps) {
  const isControlled = typeof controlledOpen === 'boolean';
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const size = useUpdatedBaseFontSize(baseFontSizeOverride);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  // typescript is not recognizing isControlled checks that controlledSetOpen exists
  const setOpen =
    isControlled && controlledSetOpen ? controlledSetOpen : uncontrolledSetOpen;

  const tooltipRef = useRef<HTMLDivElement>(null);

  const existingId = id ?? tooltipRef.current?.id;
  const tooltipId = useIdAllocator({ prefix: 'tooltip', id: existingId });
  const { darkMode: localDarkMode, theme } = useDarkMode(darkThemeProp);

  useEffect(() => {
    // If consumer is using Icon or Glyph component as trigger, the tooltip will not be visible as these components do not render their children
    if (trigger && isComponentGlyph(trigger)) {
      console.warn(
        'Using a LeafyGreenUI Icon or Glyph component as a trigger will not render a Tooltip, as these components do not render their children. To use, please wrap your trigger element in another HTML tag.',
      );
    }
  }, [trigger]);

  const handleClose = useCallback(() => {
    if (typeof shouldClose !== 'function' || shouldClose()) {
      onClose();
      setOpen(false);
    }
  }, [setOpen, shouldClose, onClose]);

  const createTriggerProps = useCallback(
    (triggerEvent: TriggerEvent, triggerProps?: any) => {
      switch (triggerEvent) {
        case TriggerEvent.Hover:
          return {
            onMouseEnter: debounce((e: MouseEvent) => {
              userTriggerHandler('onMouseEnter', e);
              setOpen(true);
            }, 35),
            onMouseLeave: debounce((e: MouseEvent) => {
              userTriggerHandler('onMouseLeave', e);
              handleClose();
            }, 35),
            onFocus: (e: MouseEvent) => {
              userTriggerHandler('onFocus', e);
              setOpen(true);
            },
            onBlur: (e: MouseEvent) => {
              userTriggerHandler('onBlur', e);
              handleClose();
            },
          };
        case TriggerEvent.Click:
        default:
          return {
            onClick: (e: MouseEvent) => {
              // ensure that we don't close the tooltip when content inside tooltip is clicked
              if (e.target !== tooltipRef.current) {
                userTriggerHandler('onClick', e);
                setOpen((curr: boolean) => !curr);
              }
            },
          };
      }

      function userTriggerHandler(handler: string, e: MouseEvent): void {
        // call any click handlers already on the trigger
        if (
          triggerProps &&
          triggerProps[handler] &&
          typeof triggerProps[handler] == 'function'
        )
          triggerProps[handler](e);
      }
    },
    [handleClose, setOpen, tooltipRef],
  );

  useEscapeKey(handleClose, { enabled: open });

  useBackdropClick(handleClose, [tooltipRef], open && triggerEvent === 'click');

  const popoverProps = {
    refEl,
    popoverZIndex,
    ...(usePortal
      ? {
          spacing,
          usePortal,
          portalClassName,
          portalContainer,
          scrollContainer,
        }
      : { spacing, usePortal }),
  };

  const active = enabled && open;
  const isLeftOrRightAligned = ['left', 'right'].includes(align);

  const tooltip = (
    <Popover
      key="tooltip"
      active={active}
      align={align}
      justify={justify}
      adjustOnMutation={true}
      onClick={stopClickPropagation}
      className={cx({
        [css`
          // Try to fit all the content on one line (until it hits max-width)
          // Overrides default behavior, which is to set width to size of the trigger.
          // Except when justify is set to fit because the width should be the size of the trigger.
          // Another exception is when justify is set to fit and the alignment is either left or right. In this case only the height should be the size of the trigger so we still want the width to fit the max content.
          width: max-content;
        `]:
          justify !== Justify.Fit ||
          (justify === Justify.Fit &&
            (align === Align.Left || align === Align.Right)),
      })}
      {...popoverProps}
    >
      {({ align, justify, referenceElPos }: PopoverFunctionParameters) => {
        const {
          notchContainer: notchContainerStyle,
          notch: notchStyle,
          tooltip: tooltipNotchStyle,
        } = notchPositionStyles({
          align,
          justify,
          triggerRect: referenceElPos,
        });

        return (
          // Establish a new DarkMode context so any LG components inherit the correct value
          // (since tooltip backgrounds are inverse to the outer context's theme)
          <LeafyGreenProvider darkMode={!localDarkMode}>
            <div
              role="tooltip"
              {...rest}
              id={tooltipId}
              className={cx(
                baseStyles,
                tooltipNotchStyle,
                colorSet[theme].tooltip,
                {
                  [minHeightStyle]: isLeftOrRightAligned,
                },
                className,
              )}
              ref={tooltipRef}
            >
              <div
                className={cx(
                  baseTypeStyle,
                  bodyTypeScaleStyles[size],
                  colorSet[theme].children,
                )}
              >
                {children}
              </div>

              <div className={notchContainerStyle}>
                <SvgNotch
                  className={cx(notchStyle)}
                  fill={colorSet[theme].notchFill}
                />
              </div>
            </div>
          </LeafyGreenProvider>
        );
      }}
    </Popover>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        ...createTriggerProps(triggerEvent),
        className: positionRelative,
        'aria-describedby': active ? tooltipId : undefined,
        children: tooltip,
      });
    }

    return React.cloneElement(trigger, {
      ...createTriggerProps(triggerEvent, trigger.props),
      'aria-describedby': active ? tooltipId : undefined,
      children: (
        <>
          {trigger.props.children}
          {tooltip}
        </>
      ),
      className: cx(positionRelative, trigger.props.className),
    });
  }

  return tooltip;
}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  triggerEvent: PropTypes.oneOf(Object.values(TriggerEvent)),
  darkMode: PropTypes.bool,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
  shouldClose: PropTypes.func,
  usePortal: PropTypes.bool,
  portalClassName: PropTypes.string,
};

export default Tooltip;
