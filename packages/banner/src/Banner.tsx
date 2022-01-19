import React from 'react';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';

const Variant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const defaultBorderSpacing = 12;

const baseBannerStyles = css`
  position: relative;
  display: flex;
  min-height: 40px;
  padding: 10px 15px 10px 20px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-radius: 12px;
  font-size: 13px;
  line-height: 20px;
  font-family: 'Euclid Circular A', Helvetica, Arial, sans-serif; // TODO: Refresh – remove when fonts are updated

  &:before {
    content: '';
    position: absolute;
    width: 13px;
    top: -1px;
    bottom: -1px;
    left: 0px;
    border-radius: 12px 0px 0px 12px;
  }
`;

const flexShrink = css`
  flex-shrink: 0;
`;

const cursorPointer = css`
  cursor: pointer;
`;

const renderedImageStyles = css`
  // this margin is set to control text alignment with the base of the renderedImage
  margin-top: 3px;
  margin-bottom: 3px;

  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const bannerVariantStyles: Record<Variant, string> = {
  [Variant.Info]: css`
    color: ${palette.blue.dark2};
    border-color: ${palette.blue.light2};
    border-left-color: ${palette.blue.base};
    background-color: ${palette.blue.light3};

    &:before {
      background: linear-gradient(
        to left,
        transparent 5px,
        ${palette.blue.base} 6px
      );
    }
  `,

  [Variant.Warning]: css`
    color: ${palette.yellow.dark2};
    border-color: ${palette.yellow.light2};
    border-left-color: ${palette.yellow.base};
    background-color: ${palette.yellow.light3};

    &:before {
      background: linear-gradient(
        to left,
        transparent 5px,
        ${palette.yellow.base} 6px
      );
    }
  `,

  [Variant.Danger]: css`
    color: ${palette.red.dark2};
    border-color: ${palette.red.light2};
    border-left-color: ${palette.red.base};
    background-color: ${palette.red.light3};

    &:before {
      background: linear-gradient(
        to left,
        transparent 5px,
        ${palette.red.base} 6px
      );
    }
  `,

  [Variant.Success]: css`
    color: ${palette.green.dark2};
    border-color: ${palette.green.light2};
    border-left-color: ${palette.green.base};
    background-color: ${palette.green.light3};

    &:before {
      background: linear-gradient(
        to left,
        transparent 5px,
        ${palette.green.dark1} 6px
      );
    }
  `,
} as const;

const map = {
  [Variant.Info]: { color: palette.blue.base, icon: InfoWithCircleIcon },
  [Variant.Warning]: {
    color: palette.yellow.dark2,
    icon: ImportantWithCircleIcon,
  },
  [Variant.Danger]: { color: palette.red.base, icon: WarningIcon },
  [Variant.Success]: {
    color: palette.green.dark1,
    icon: CheckmarkWithCircleIcon,
  },
};

const dismissibleMap = {
  [Variant.Info]: { color: palette.blue.dark2 },
  [Variant.Warning]: {
    color: palette.yellow.dark2,
  },
  [Variant.Danger]: { color: palette.red.dark2 },
  [Variant.Success]: {
    color: palette.green.dark2,
  },
};

const getTextStyle = (image: boolean, dismissible: boolean) => {
  const defaultIconSize = 16;

  const styleObj: {
    marginLeft?: string;
    marginRight?: string;
  } = {
    marginLeft: undefined,
    marginRight: undefined,
  };

  if (image) {
    styleObj.marginLeft = '17px';
    styleObj.marginRight = '4px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + defaultBorderSpacing}px`;
    }
  } else {
    styleObj.marginLeft = `13px`;
    styleObj.marginRight = '10px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + 16}px`;
    }
  }

  return css`
    align-self: center;
    flex-grow: 1;
    margin-left: ${styleObj.marginLeft};
    margin-right: ${styleObj.marginRight};
  `;
};

interface BannerProps extends HTMLElementProps<'div', never> {
  /**
   * Sets the variant for the Banner
   *
   * Default: `'info'`
   */
  variant?: Variant;

  /**
   * Illustration that will replace default Icon when the prop is supplied
   */
  image?: React.ReactElement;

  /**
   * Determines whether or not the Banner is dismissible
   *
   * Default: `false`
   */
  dismissible?: boolean;

  /**
   * Callback fired when dismiss button is clicked
   *
   * Default: `() => {}`
   */
  onClose?: React.MouseEventHandler;
}

/**
 * # Banner
 *
 * Banner component
 *
 * ```
<Banner>Banner content goes here.</Banner>
```
 * @param props.variant Sets the variant for the Banner.
 * @param props.image Illustration that will replace default Icon when the prop is supplied.
 * @param props.dismissible Determines whether or not the Banner is dismissible.
 * @param props.onClose Callback fired when dismiss button is clicked.
 */
export default function Banner({
  variant = Variant.Info,
  dismissible = false,
  onClose = () => {},
  image,
  children,
  className,
  ...rest
}: BannerProps) {
  const { icon: Icon, color } = map[variant];

  const renderIcon = image ? (
    React.cloneElement(image, {
      className: renderedImageStyles,
    })
  ) : (
    <Icon
      fill={color}
      className={cx(
        flexShrink,
        css`
          margin-top: 3px;
        `,
      )}
    />
  );

  return (
    <div
      role="alert"
      className={cx(baseBannerStyles, bannerVariantStyles[variant], className)}
      {...rest}
    >
      {renderIcon}
      <div className={getTextStyle(image != null, dismissible)}>{children}</div>
      {dismissible && (
        <XIcon
          fill={dismissibleMap[variant].color}
          onClick={onClose}
          className={cx(
            flexShrink,
            cursorPointer,
            css`
              margin-top: 3px;
            `,
          )}
        />
      )}
    </div>
  );
}
