import React from 'react';
import { StepStates, StepIconProps, Mode } from './types';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';
import { useStepperContext } from './StepperContext';
import { stepIconClassName } from './constants';

const StepIconGlyph = ({ state, content }: StepIconProps) => {
  if (state === StepStates.Completed) {
    return <CheckmarkIcon />;
  } else if (
    state === StepStates.UpcomingMultiple ||
    state === StepStates.CompletedMultiple
  ) {
    return <EllipsisIcon />;
  } else {
    // if Current (single) or Upcoming (single)
    // TODO: Use centralized, reusable font-weight value
    return (
      <Overline
        className={css`
          font-weight: 500;
          color: inherit;
        `}
      >
        {content}
      </Overline>
    );
  }
};

const StepIcon = ({ state, size, ...rest }: StepIconProps) => {
  const { isDarkMode } = useStepperContext();
  const baseStyles = css`
    width: ${size}px;
    height: ${size}px;
    box-sizing: content-box;
    margin-bottom: ${spacing[1]}px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    // TODO: use centralized transition prop
    transition: 0.3s box-shadow ease;
    z-index: 1;

    svg {
      width: 100%;
    }
  `;

  // Light Mode Styles
  const completedStyles = css`
    color: ${palette.white};
    border-color: ${palette.green.dark1};
    background-color: ${palette.green.dark1};
  `;

  const currentStyles = css`
    color: ${palette.green.dark2};
    background-color: ${palette.white};
    border-color: ${palette.green.dark1};
  `;

  const upcomingStyles = css`
    color: ${palette.gray.dark1};
    background-color: ${palette.white};
    border-color: ${palette.gray.dark1};
  `;

  // Dark Mode Styles
  const darkCompletedStyles = css`
    color: ${palette.black};
    border-color: ${palette.green.base};
    background-color: ${palette.green.base};
  `;

  const darkCurrentStyles = css`
    color: ${palette.green.base};
    background-color: ${palette.black};
    border-color: ${palette.green.base};
  `;

  const darkUpcomingStyles = css`
    color: ${palette.gray.light1};
    background-color: ${palette.black};
    border-color: ${palette.gray.light1};
  `;

  const styles = {
    [Mode.Dark]: {
      [StepStates.CompletedMultiple]: darkCompletedStyles,
      [StepStates.Completed]: darkCompletedStyles,
      [StepStates.Current]: darkCurrentStyles,
      [StepStates.Upcoming]: darkUpcomingStyles,
      [StepStates.UpcomingMultiple]: darkUpcomingStyles,
    },
    [Mode.Light]: {
      [StepStates.CompletedMultiple]: completedStyles,
      [StepStates.Completed]: completedStyles,
      [StepStates.Current]: currentStyles,
      [StepStates.Upcoming]: upcomingStyles,
      [StepStates.UpcomingMultiple]: upcomingStyles,
    },
  };

  return (
    <div
      className={cx(
        stepIconClassName,
        baseStyles,
        styles[isDarkMode ? Mode.Dark : Mode.Light][state],
      )}
    >
      <StepIconGlyph state={state} {...rest} />
    </div>
  );
};

export default StepIcon;
