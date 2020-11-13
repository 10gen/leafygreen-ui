import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

interface ColorSet {
  interactionRingHover: string;
  interactionRingFocus: string;
}

const colorSets: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    interactionRingHover: uiColors.gray.light2,
    interactionRingFocus: '#9dd0e7',
  },
  [Mode.Dark]: {
    interactionRingHover: uiColors.gray.dark1,
    interactionRingFocus: uiColors.blue.base,
  },
};

const baseContainerStyle = css`
  display: inline-flex;
  align-items: stretch;
  position: relative;
  z-index: 0;
`;

const baseInteractionRingStyle = css`
  transition: all 150ms ease-in-out;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

const interactionRingDataProp = createDataProp('interaction-ring');

function computeStyles({
  mode,
  hovered,
  focused,
  borderRadius = '4px',
  color,
}: {
  mode: Mode;
  hovered: boolean | undefined;
  focused: boolean | undefined;
  borderRadius?: string;
  color?: {
    focused?: string;
    hovered?: string;
  };
}) {
  const hoverStyle = css`
    box-shadow: 0 0 0 3px
      ${color?.hovered ?? colorSets[mode].interactionRingHover};
  `;

  const focusStyle = css`
    box-shadow: 0 0 0 3px
      ${color?.focused ?? colorSets[mode].interactionRingFocus};
  `;

  return {
    container: cx(baseContainerStyle, {
      [css`
        &:hover > ${interactionRingDataProp.selector} {
          ${hoverStyle}
        }
      `]: hovered !== false && !focused,
    }),
    interactionRing: cx(
      baseInteractionRingStyle,
      css`
        border-radius: ${borderRadius};
      `,
      {
        [hoverStyle]: hovered ?? false,
      },
      {
        [focusStyle]: focused,
      },
    ),
  };
}

const baseContentStyle = css`
  width: 100%;
  height: 100%;

  // Form elements don't always inherit these by default
  // https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms#Fonts_and_text
  font-family: inherit;
  font-size: 100%;
`;

interface State {
  hovered?: boolean;
  focused?: boolean;
}

interface InteractionRingProps {
  darkMode?: boolean;
  className?: string;
  borderRadius?: string;
  color?: {
    focused?: string;
    hovered?: string;
  };
  focusTargetElement?: HTMLElement | null;
  children: React.ReactElement;
  disabled?: boolean;
  forceState?: State;
}

export default function InteractionRing({
  darkMode = false,
  className,
  borderRadius,
  color,
  focusTargetElement,
  children,
  disabled = false,
  forceState = {},
  ...rest
}: InteractionRingProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  const [focused, setFocused] = useState<boolean>();

  const styles = computeStyles({
    mode,
    hovered: forceState.hovered,
    focused: showFocus && (forceState.focused ?? focused),
    borderRadius,
    color,
  });

  useEffect(() => {
    if (focusTargetElement === undefined || focusTargetElement === null) {
      return;
    }

    const focused = focusTargetElement === document.activeElement;
    setFocused(focused);

    if (focused) {
      const offFocus = () => setFocused(false);
      focusTargetElement.addEventListener('blur', offFocus);
      return () => focusTargetElement.removeEventListener('focus', offFocus);
    } else {
      const onFocus = () => setFocused(true);
      focusTargetElement.addEventListener('focus', onFocus);
      return () => focusTargetElement.removeEventListener('focus', onFocus);
    }
  }, [focusTargetElement]);

  const { className: contentClassName } = children.props;

  const childIsFocusTarget = focusTargetElement === undefined;

  const onFocus = useMemo(
    () =>
      childIsFocusTarget ? () => setFocused(true) : children.props.onFocus,
    [children.props.onFocus, childIsFocusTarget],
  );

  const onBlur = useMemo(
    () =>
      childIsFocusTarget ? () => setFocused(false) : children.props.onBlur,
    [children.props.onBlur, childIsFocusTarget],
  );

  const content = useMemo(
    () =>
      React.cloneElement(children, {
        className: cx(baseContentStyle, contentClassName),
        onFocus,
        onBlur,
      }),
    [children, contentClassName, onBlur, onFocus],
  );

  return (
    <div className={cx(styles.container, className)} {...rest}>
      {content}
      {!disabled && (
        <div
          {...interactionRingDataProp.prop}
          className={styles.interactionRing}
        />
      )}
    </div>
  );
}

InteractionRing.displayName = 'InteractionRing';
