/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 25f1133b7ae929e562bb60095e6e759f
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
  return 'ImportantWithCircle' + '-' + Math.floor(Math.random() * 1000000);
}

const ImportantWithCircle = ({
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
  title = getGlyphTitle('ImportantWithCircle', title);
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
        <title id={titleId}>{'Important With Circle'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Important-With-Circle"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M9,8.75 L7,8.75 L6.75,3.75 L9.25,3.75 L9,8.75 Z M8,12.25 C7.31,12.25 6.75,11.69 6.75,11 C6.75,10.31 7.31,9.75 8,9.75 C8.69,9.75 9.25,10.31 9.25,11 C9.25,11.69 8.69,12.25 8,12.25 L8,12.25 Z M8,0.5 C3.857,0.5 0.5,3.857 0.5,8 C0.5,12.142 3.857,15.5 8,15.5 C12.142,15.5 15.5,12.142 15.5,8 C15.5,3.857 12.142,0.5 8,0.5 L8,0.5 Z"
          id="Shape"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

ImportantWithCircle.displayName = 'ImportantWithCircle';
ImportantWithCircle.isGlyph = true;
ImportantWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ImportantWithCircle;
