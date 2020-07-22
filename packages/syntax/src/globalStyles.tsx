import { Variant } from './types';
import { injectGlobal } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

interface Base16Palette {
  0: string; // Background
  1: string; // Borders / non-text graphical accents
  2: string; // Comments, Doctags, Formulas
  3: string; // Default Text
  4: string; // Highlights
  5: string; // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  6: string; // Classes, Markup Bold, Search Text Background
  7: string; // Strings, Inherited Class, Markup Code, Diff Inserted
  8: string; // Support, Regular Expressions, Escape Characters, Markup Quotes
  9: string; // Functions, Methods, Classes, Names, Sections, Literals
  10: string; // Keywords, Storage, Selector, Markup Italic, Diff Changed
}

export const variantColors: { readonly [K in Variant]: Base16Palette } = {
  [Variant.Light]: {
    0: uiColors.gray.light3,
    1: uiColors.gray.light2,
    2: uiColors.gray.dark2,
    3: uiColors.gray.dark3,
    4: uiColors.white,
    5: '#CA4821',
    6: '#EDB210',
    7: '#12824D',
    8: uiColors.blue.dark2,
    9: uiColors.blue.base,
    10: '#CC3887',
  },

  [Variant.Dark]: {
    0: uiColors.black,
    1: uiColors.gray.dark3,
    2: uiColors.gray.light1,
    3: uiColors.gray.light3,
    4: uiColors.gray.dark2,
    5: '#FF6F44',
    6: '#EDB210',
    7: '#35DE7B',
    8: '#a5e3ff',
    9: '#2DC4FF',
    10: '#FF7DC3',
  },
};

const getStyles = (variant: Variant): string => `
  .lg-highlight-hljs-${variant} {
    .lg-highlight-quote,
    .lg-highlight-literal,
    .lg-highlight-class,
    .lg-highlight-section,
    .lg-highlight-name,
    .lg-highlight-class > .lg-highlight-keyword,
    .lg-highlight-function > .lg-highlight-keyword {
      color: ${variantColors[variant][9]};
    }
  
    .lg-highlight-regexp,
    .lg-highlight-params,
    .lg-highlight-meta,
    .lg-highlight-meta-string {
      color: ${variantColors[variant][8]};
    }
  
    .lg-highlight-comment {
      color: ${variantColors[variant][2]};
      font-style: italic;
    }

    .lg-highlight-doctag,
    .lg-highlight-formula {
      color: ${variantColors[variant][3]};
    }
  
    .lg-highlight-keyword,
    .lg-highlight-selector-tag,
    .lg-highlight-selector-attr,
    .lg-highlight-selector-pseudo,
    .lg-highlight-selector-id,
    .lg-highlight-selector-class {
      color: ${variantColors[variant][10]};
    }
  
    .lg-highlight-variable,
    .lg-highlight-deletion,
    .lg-highlight-symbol,
    .lg-highlight-bullet,
    .lg-highlight-subst,
    .lg-highlight-meta,
    .lg-highlight-link,
    .lg-highlight-number,
    .lg-highlight-attr,
    .lg-highlight-attribute,
    .lg-highlight-built_in,
    .lg-highlight-template-variable,
    .lg-highlight-type {
      color: ${variantColors[variant][5]}
    }
  
    .lg-highlight-string,
    .lg-highlight-addition,
    .lg-highlight-title {
      color: ${variantColors[variant][7]};
    }
  
    .lg-highlight-emphasis {
      font-style: italic;
    }
  
    .lg-highlight-strong {
      font-weight: bold;
    }
  }
`;

export function injectGlobalStyles() {
  Object.values(Variant).forEach(variant => injectGlobal(getStyles(variant)));
}
