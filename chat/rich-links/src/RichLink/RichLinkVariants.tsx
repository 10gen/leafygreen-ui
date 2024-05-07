import React from 'react';

import {
  BaseRichLinkProps,
  PolymorphicBaseRichLinkProps,
  PolymorphicRichLinkWithBadgeProps,
  RichLinkProps,
} from './RichLink.types';
import { RichLink } from '.';

const richLinkVariantProps = {
  Blog: {
    badgeColor: 'green',
    badgeLabel: 'Blog',
    badgeGlyph: 'SMS',
  },
  Book: {
    badgeColor: 'yellow',
    badgeLabel: 'Book',
    badgeGlyph: 'University',
  },
  Code: {
    badgeColor: 'gray',
    badgeLabel: 'Code',
    badgeGlyph: 'CodeBlock',
  },
  Docs: {
    badgeColor: 'blue',
    badgeLabel: 'Docs',
    badgeGlyph: 'Note',
  },
  Learn: {
    badgeColor: 'red',
    badgeLabel: 'Learn',
    badgeGlyph: 'Cap',
  },
  Video: {
    badgeColor: 'red',
    badgeLabel: 'Video',
    badgeGlyph: 'Play',
  },
  Website: {
    badgeColor: 'purple',
    badgeLabel: 'Website',
    badgeGlyph: 'Laptop',
  },
} as const satisfies Record<string, CreateRichLinkVariantArgs>;

export type CreateRichLinkVariantArgs = Omit<
  PolymorphicRichLinkWithBadgeProps,
  keyof BaseRichLinkProps
>;

export const createRichLinkVariant = (args: CreateRichLinkVariantArgs) => {
  const RichLinkVariant = (props: PolymorphicBaseRichLinkProps) => (
    <RichLink {...args} {...props} />
  );
  return RichLinkVariant;
};

export type RichLinkVariantName = keyof typeof richLinkVariantProps;

export type RichLinkVariantMap = Record<
  RichLinkVariantName,
  React.ComponentType<RichLinkProps>
>;

const variantEntries = Object.entries(richLinkVariantProps) as Array<
  [RichLinkVariantName, CreateRichLinkVariantArgs]
>;

export const richLinkVariants = variantEntries.reduce(
  (acc, [variantName, createRichLinkVariantArgs]) => {
    return {
      ...acc,
      [variantName]: createRichLinkVariant(createRichLinkVariantArgs),
    };
  },
  {},
) as RichLinkVariantMap;
