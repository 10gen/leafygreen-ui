/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 23ba9037ab995205c213e10c2dc1f32a
 *
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
export interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | 'small' | 'default' | 'large' | 'xlarge';
  titleId?: string;
  title?: string | null | boolean;
}
const sizeMap = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
};

function getGlyphTitle(name: string, title?: string | boolean | null) {
  if (title === false) {
    return null;
  }

  if (title == null || title === true) {
    return `${name.replace(/([a-z])([A-Z])/g, '$1 $2')} Icon`;
  }

  return title;
}

function generateGlyphTitle(): string {
  return 'ChevronLeft' + '-' + Math.floor(Math.random() * 1000000);
}

const ChevronLeft = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: Props) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ChevronLeft', title);
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      {...props}
      viewBox="0 0 16 16"
      role="img"
      aria-labelledby={titleId}
    >
      {title === undefined ? (
        <title id={titleId}>{'ChevronLeft'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="ChevronLeft-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M7.16396103,3.51396103 L14.163961,3.51396103 L14.163961,5.51396103 L7.16396103,5.51396103 L7.16396103,12.513961 L5.16396103,12.513961 L5.16396103,3.51396103 L7.16396103,3.51396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(9.663961, 8.013961) rotate(-45.000000) translate(-9.663961, -8.013961) "
        />
      </g>
    </svg>
  );
};

ChevronLeft.displayName = 'ChevronLeft';
ChevronLeft.isGlyph = true;
ChevronLeft.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronLeft;
