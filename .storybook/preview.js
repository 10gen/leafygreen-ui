import { addDecorator } from '@storybook/react';
import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
} from '@leafygreen-ui/typography';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: '',
      order: ['Overview', 'Sample Pages', 'Packages'],
      locales: '',
    },
  },
  docs: {
    components: {
      h1: H1,
      h2: H2,
      h3: H3,
      h4: Subtitle,
      p: Body,
      code: InlineCode,
    },
  },
};

addDecorator(ReactStrictMode);
addDecorator(ComponentPreview);
