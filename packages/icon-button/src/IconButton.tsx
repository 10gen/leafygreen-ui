import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { Either, isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { breakpoints } from '@leafygreen-ui/tokens';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const Size = {
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

type Size = typeof Size[keyof typeof Size];

export { Size };

const removeButtonStyle = css`
  border: none;
  -webkit-appearance: unset;
  padding: unset;
`;

const baseIconButtonStyle = css`
  display: inline-block;
  border-radius: 100px;
  color: ${uiColors.gray.base};
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

  // Set background to fully-transparent white for cross-browser compatability with Safari
  //
  // Safari treats "transparent" values in CSS as transparent black instead of white
  // which can make things render differently across browsers if not defined explicitly.
  background-color: rgba(255, 255, 255, 0);

  &:before {
    content: '';
    transition: 150ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 100%;
    opacity: 0;
    transform: scale(0.8);
  }

  &:active:before,
  &:hover:before,
  &:focus:before {
    opacity: 1;
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }
`;

const iconButtonSizes = {
  [Size.Default]: css`
    height: 28px;
    width: 28px;
  `,
  [Size.Large]: css`
    height: 35px;
    width: 35px;
  `,
  [Size.XLarge]: css`
    height: 42px;
    width: 42px;
  `,
} as const;

const getIconButtonModeStyle = (
  isTouchDevice: boolean,
  mode: 'dark' | 'light',
) => {
  if (mode === Mode.Light) {
    return css`
      &:active,
      &:hover {
        color: ${uiColors.gray.dark2};

        &:before {
          background-color: ${uiColors.gray.light2};
        }
      }

      &:focus {
        color: ${uiColors.blue.base};

        &:before {
          background-color: ${uiColors.blue.light2};
        }
      }
    `;
  }

  return css`
    &:active,
    &:hover {
      &:before {
        background-color: ${uiColors.gray.dark2};
      }
      color: ${uiColors.white};
    }

    &:focus:before {
      background-color: ${uiColors.blue.dark2};
    }
  `;
};

const disabledStyle = {
  [Mode.Light]: css`
    color: ${uiColors.gray.light2};
    pointer-events: none;
  `,

  [Mode.Dark]: css`
    color: ${uiColors.gray.dark2};
    pointer-events: none;
  `,
} as const;

const activeStyle = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark2};
    background-color: ${uiColors.gray.light2};

    &:before {
      background-color: ${uiColors.gray.light2};
    }
  `,

  [Mode.Dark]: css`
    color: ${uiColors.white};
    background-color: ${uiColors.gray.dark2};

    &:before {
      background-color: ${uiColors.gray.dark2};
    }
  `,
} as const;

const iconStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Since applications can't yet tree-shake, we're duplicating this interface from the types in the namespaces within the Icon package rather than importing the Icon package.
interface IconProps extends React.SVGProps<SVGSVGElement> {
  glyph: string;
  size?: Size | number;
  title?: string | null | boolean;
}
interface BaseIconButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: Size;
  darkMode?: boolean;
  active?: boolean;
  href?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

type AccessibleIconButtonProps = Either<BaseIconButtonProps, AriaLabels>;

const IconButton: ExtendableBox<
  AccessibleIconButtonProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      size = Size.Default,
      darkMode = false,
      disabled = false,
      active = false,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    }: AccessibleIconButtonProps,
    ref: React.Ref<any>,
  ) => {
    const viewport = useViewportSize();
    const isTouchDevice = viewport?.width
      ? viewport?.width < breakpoints.Tablet
      : false;

    const mode = darkMode ? 'dark' : 'light';

    // We do our own proptype validation here to ensure either 'aria-label' or 'aria-labelledby' are passed to the component.
    if (!ariaLabel && !ariaLabelledBy) {
      console.error(
        'For screen-reader accessibility, aria-label or aria-labelledby must be provided to IconButton.',
      );
    }

    const processedChildren = React.Children.map(children, child => {
      if (!child) {
        return null;
      }

      // Check to see if child is a LeafyGreen Icon or a LeafyGreen Glyph
      // If so, we unset the title and rely on the aria-label prop to give
      // information about the rendered content.
      if (isComponentType(child, 'Icon') || isComponentGlyph(child)) {
        const { size: childSize, title }: IconProps = child.props;

        const newChildProps: Partial<IconProps> = {
          size: childSize || size,
        };

        if (typeof title !== 'string' || title.length === 0) {
          // Unsets the title within an icon since the button itself will have
          // aria-label or aria-labelledby set.
          newChildProps.title = false;
        }

        return React.cloneElement(child, newChildProps);
      }

      return child;
    });

    const accessibleLabel = ariaLabel
      ? { ['aria-label']: ariaLabel }
      : { ['aria-labelledby']: ariaLabelledBy };

    const iconButtonProps = {
      ...rest,
      ...accessibleLabel,
      ref,
      tabIndex: disabled ? -1 : 0,
      ['aria-disabled']: disabled,
      className: cx(
        removeButtonStyle,
        baseIconButtonStyle,
        iconButtonSizes[size],
        getIconButtonModeStyle(isTouchDevice, mode),
        {
          [disabledStyle[mode]]: disabled,
          [activeStyle[mode]]: active,
        },
        className,
      ),
    };

    if (typeof rest.href === 'string') {
      return (
        <Box as="a" {...iconButtonProps}>
          <div className={iconStyle}>{processedChildren}</div>
        </Box>
      );
    }

    return (
      <Box as="button" {...iconButtonProps}>
        <div className={iconStyle}>{processedChildren}</div>
      </Box>
    );
  },
);

IconButton.displayName = 'IconButton';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
IconButton.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  // @ts-ignore
  href: PropTypes.string,
  active: PropTypes.bool,
};

export default IconButton;
