import React from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import {
  defaultStorybookArgTypes,
  StoryMetaType,
  Theme,
} from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import { graphics } from '../example-graphics';

import { FeaturesEmptyState, FeaturesEmptyStateProps } from '.';

const meta: StoryMetaType<typeof FeaturesEmptyState> = {
  title: 'Components/EmptyState/Features',
  component: FeaturesEmptyState,
  args: {
    title: 'Sample title of features empty state',
    primaryButton: <Button>Add Dependency</Button>,
  },
  argTypes: {
    features: { control: 'none' },
    externalLink: { control: 'none' },
    primaryButton: { control: 'none' },
    secondaryButton: { control: 'none' },
    darkMode: defaultStorybookArgTypes.darkMode,
  },
  parameters: {
    default: null,
  },
};
export default meta;

const Template: StoryFn<FeaturesEmptyStateProps> = props => {
  // eslint-disable-next-line react/prop-types
  const theme = props.darkMode ? Theme.Dark : Theme.Light;

  // replace graphic props with appropriate graphic for theme
  // eslint-disable-next-line react/prop-types
  const features = props.features.map((feature, index) => {
    return {
      ...feature,
      graphic: graphics[theme][index],
    };
  });

  return <FeaturesEmptyState {...props} features={features} />;
};

export const TwoFeatures = Template.bind({});
TwoFeatures.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
};

export const TwoFeaturesWithSecondaryAction = Template.bind({});
TwoFeaturesWithSecondaryAction.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
  secondaryButton: <Button>Upload Module</Button>,
};

export const TwoFeaturesWithSecondaryActionAndLink = Template.bind({});
TwoFeaturesWithSecondaryActionAndLink.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
  secondaryButton: <Button>Upload Module</Button>,
  externalLink: <Link href="http://www.google.com">Test external link</Link>,
};

export const ThreeFeatures = Template.bind({});
ThreeFeatures.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
};

export const ThreeFeaturesWithSecondaryAction = Template.bind({});
ThreeFeaturesWithSecondaryAction.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
  secondaryButton: <Button>Upload Module</Button>,
};

export const ThreeFeaturesWithSecondaryActionAndLink = Template.bind({});
ThreeFeaturesWithSecondaryActionAndLink.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
  secondaryButton: <Button>Upload Module</Button>,
  externalLink: <Link href="http://www.google.com">Test external link</Link>,
};
