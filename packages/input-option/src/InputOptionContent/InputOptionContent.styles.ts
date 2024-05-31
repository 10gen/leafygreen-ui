import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing, State, Variant } from '@leafygreen-ui/tokens';

export const leftGlyphClassName = createUniqueClassName(
  'input-option-left-glyph',
);

interface InputOptionStyleArgs {
  theme: Theme;
  disabled?: boolean;
  highlighted?: boolean;
  selected?: boolean;
}

export const getContentWrapperStyles = css`
  display: grid;
  grid-template-columns: ${spacing[400]}px 1fr ${spacing[400]}px;
  grid-template-areas: 'left-glyph text right-glyph';
  gap: ${spacing[200]}px;
  align-items: center;
  width: 100%;
`;

export const getLeftGlyphStyles = ({
  theme,
  disabled,
  highlighted,
  selected,
}: InputOptionStyleArgs) => {
  const variant = disabled ? Variant.Disabled : Variant.Primary;
  const ixnState = highlighted || selected ? State.Focus : State.Default;

  return css`
    grid-area: left-glyph;
    display: flex;
    height: 20px;
    align-items: center;
    color: ${color[theme].icon[variant][ixnState]};
  `;
};

export const getRightGlyphStyles = ({
  theme,
  disabled,
}: InputOptionStyleArgs) => {
  const variant = disabled ? Variant.Disabled : Variant.Primary;

  return css`
    grid-area: right-glyph;
    display: flex;
    height: 20px;
    align-items: center;
    color: ${color[theme].icon[variant].default};
  `;
};

export const textContainerStyles = css`
  grid-area: text;
  line-height: ${spacing[400]}px;
`;

export const getTitleStyles = ({
  highlighted,
  selected,
}: InputOptionStyleArgs) => css`
  overflow-wrap: anywhere;
  font-size: inherit;
  line-height: inherit;

  ${(highlighted || selected) &&
  css`
    font-weight: bold;
  `}
`;

export const getDescriptionStyles = ({
  theme,
  disabled,
}: InputOptionStyleArgs) => {
  const variant = disabled ? Variant.Disabled : Variant.Secondary;

  return css`
    max-height: ${spacing[1200]}px;
    overflow: hidden;
    font-size: inherit;
    line-height: inherit;
    text-overflow: ellipsis;
    color: ${color[theme].text[variant].default};
  `;
};
