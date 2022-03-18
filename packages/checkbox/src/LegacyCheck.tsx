import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  spritesheetLight,
  disabledLight,
  disabledLightChecked,
  indeterminateLight,
} from './img';
import { CheckProps } from './types';

const height = 20;
const width = 600;

const wrapperStyleAnimated = css`
  transition: 300ms opacity ease-in-out;
`;

const wrapperStyle = css`
  height: ${height}px;
  width: ${height}px;
  display: inline-block;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  opacity: 0.9;
`;

const checkboxStyle = css`
  height: ${height}px;
  width: ${width}px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const wrapperStyleChecked = css`
  opacity: 1;
`;

const checkboxStyleAnimated = css`
  transition: 500ms transform steps(29);
`;

const checkboxStyleChecked = css`
  transform: translate3d(${-width + height}px, 0, 0);
`;

export function LegacyCheck({
  isChecked,
  indeterminate,
  disabled,
  animate,
  selector,
}: CheckProps) {
  const checkboxBackgroundImage = (() => {
    if (disabled) {
      if (isChecked) {
        return css`
          background-image: url(${disabledLightChecked});
        `;
      }

      return css`
        background-image: url(${disabledLight});
      `;
    }

    if (indeterminate) {
      return css`
        background-image: url(${indeterminateLight});
      `;
    }

    return css`
      background-image: url(${spritesheetLight});
    `;
  })();

  return (
    <div
      {...selector.prop}
      className={cx(wrapperStyle, {
        [wrapperStyleChecked]: isChecked && indeterminate && !disabled,
        [wrapperStyleAnimated]: animate && !indeterminate && !disabled,
      })}
    >
      <div
        className={cx(checkboxStyle, checkboxBackgroundImage, {
          [checkboxStyleChecked]: isChecked && !indeterminate && !disabled,
          [checkboxStyleAnimated]: animate && !indeterminate && !disabled,
        })}
      />
    </div>
  );
}
