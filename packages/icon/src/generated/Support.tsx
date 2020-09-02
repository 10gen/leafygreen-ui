/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 232f220dcf1d5bf6ba75bbc0c72a85d3
 *
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SupportProps extends LGGlyph.ComponentProps {}

function generateGlyphTitle(): string {
  return `Support-${Math.floor(Math.random() * 1000000)}`;
}

const Support = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: SupportProps) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Support', title);
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
        <title id={titleId}>{'Support'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Support-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M8,0 C10.8984375,0 13,2.1015625 13,5 L13,11 L11,11 L11,5 C11,3.0703125 9.65625,2 8,2 C6.34375,2 5,3.0703125 5,5 L5,11 L3,11 L3,5 C3,2.1015625 5.1015625,0 8,0 Z M0,8 C0,6.34375 0.34375,5 2,5 L2,11 C0.34375,11 0,9.65625 0,8 Z M14,5 C15.65625,5 16,6.34375 16,8 C16,9.65625 15.65625,11 14,11 L14,5 Z M2,13.7890625 L2,11 L3,11 L3,13.2109375 L5,14.3515625 L5,14 L7,14 L7,16 L5,16 L5,15.5078125 L2,13.7890625 Z"
          id="\uE210"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Support.displayName = 'Support';
Support.isGlyph = true;
Support.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Support;
