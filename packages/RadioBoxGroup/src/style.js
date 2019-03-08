import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { border } from 'polished';

const { css } = emotion;

const defaultBorderSize = 1;
const selectedBorderSize = 3;
const borderDifference = 2;
const externalSpacing = 10;
const internalSpacing = 15;

const borderRadius = 3;
const borderRadiusChecked = 5;

const defaultWidth = 175;

export const baseInputStyle = css`
  visibility: hidden;
  display: none;
`;

export const container = css`
  display: block;
  float: left;
  box-sizing: content-box;
  padding: ${internalSpacing}px;
  border: ${defaultBorderSize}px solid ${colors.gray[5]};
  border-radius: ${borderRadius}px;
  margin-top: ${borderDifference}px;
  margin-right: ${externalSpacing + borderDifference}px;
  margin-bottom: ${externalSpacing + borderDifference}px;
  font-weight: normal;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;
  text-align: center;

  &[disabled] {
    background: ${colors.gray[8]};
    border-color: ${colors.gray[7]};
    box-shadow: none;
    color: ${colors.gray[5]};
    cursor: not-allowed;

    &:hover {
      background: ${colors.gray[8]};
      border-color: ${colors.gray[7]};
    }
  }

  &:hover {
    transition: border-color 150ms ease-out;
    border-color: ${colors.gray[3]};
  }

  &:focus {
    transition: all 150ms ease-in-out;
    border: 2px solid rgba(196, 219, 179, 0.7);
    transform: scale(1.05);
    outline: transparent;
  }

  &:last-of-type {
    margin-right: 0px;
  }
`;
export const baseTextStyle = css`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  vertical-align: top;
  overflow-wrap: break-word;
`;

export const checkedStyle = css`
  border-radius: ${borderRadiusChecked}px;
  border: ${selectedBorderSize}px solid ${colors.green[2]};
  transition: border-color 150ms ease-out;
  margin-top: 0px;
  margin-left: -2px;
  margin-right: ${externalSpacing}px;
  margin-bottom: ${externalSpacing}px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15);
  transition: border-color 150ms ease-out;

  &:hover {
    border-color: ${colors.green[2]};
  }

  &:last-of-type {
    margin-right: -2px;
  }
`;

export const radioBoxSizes = {
  default: css`
    width: ${defaultWidth - 2 * selectedBorderSize - 2 * internalSpacing}px;
    padding: ${internalSpacing - 5 * internalSpacing}px;
  `,

  tightContentBox: css`
    padding-right: 4px;
    padding-left: 4px;
  `,

  full: css`
    flex: 1;
  `,
};

export const baseGroupStyle = css`
  display: flex;
`;
