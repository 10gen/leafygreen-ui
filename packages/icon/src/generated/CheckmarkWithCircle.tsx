/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 0e3f167bc33c3e53964d882b3e4ab67b
 *
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CheckmarkWithCircleProps extends LGGlyph.ComponentProps {}

function generateGlyphTitle(): string {
  return `CheckmarkWithCircle-${Math.floor(Math.random() * 1000000)}`;
}

const CheckmarkWithCircle = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: CheckmarkWithCircleProps) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('CheckmarkWithCircle', title);
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
        <title id={titleId}>{'Glyphs / Checkmark With Circle'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Checkmark-With-Circle"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M8,15.5 C3.85786438,15.5 0.5,12.1421356 0.5,8 C0.5,3.85786438 3.85786438,0.5 8,0.5 C12.1421356,0.5 15.5,3.85786438 15.5,8 C15.5,12.1421356 12.1421356,15.5 8,15.5 Z M6.94974747,9.94974747 L4.12132034,7.12132034 L2.70710678,8.53553391 L6.94974747,12.7781746 L8.36396103,11.363961 L13.3137085,6.41421356 L11.8994949,5 L6.94974747,9.94974747 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

CheckmarkWithCircle.displayName = 'CheckmarkWithCircle';
CheckmarkWithCircle.isGlyph = true;
CheckmarkWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CheckmarkWithCircle;
