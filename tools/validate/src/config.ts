import { getPackageJson } from '@lg-tools/meta';
import depcheck from 'depcheck';

export interface DepCheckFunctionProps {
  pkgName: string;
  pkgJson: ReturnType<typeof getPackageJson>;
  importedPackages: depcheck.Results['using'];
}

export interface DependencyIssues {
  missingDependencies: Array<string>;
  missingDevDependencies: Array<string>;
  unusedDependencies: Array<string>;
  unusedDevDependencies: Array<string>;
  listedDevButUsedAsDependency: Array<string>;
  listedButOnlyUsedAsDev: Array<string>;
  isMissingPeers: boolean;
}

/*
 * Skip build and dependency checks for these packages
 */
export const ignorePackages = [
  '@lg-tools/storybook',
  '@lg-tools/eslint-plugin',
];

/**
 * Treat packages imported by these files as `devDependencies`
 */
export const devFilePatterns: Array<RegExp> = [
  /.*scripts\/.*/,
  /.*.stories.js/,
  /.*.spec.tsx?/,
  /.*.?stor(y|ies).(t|j)sx?/,
  /.*.stories.tsx?/,
  /.*.example.tsx?/,
  /.*.test(-?[uU])til(itie)?s((.tsx?)|(\/.*))/,
  /.*\/test(ing|-?[uU]til(itie)?s)?\//g,
  /.*\/dist\/.*/,
];

/**
 * Ignore dependency errors in these files
 */
export const ignoreFilePatterns: Array<RegExp> = [
  /.*package.json?/,
  /.*README.md/,
  /.*CHANGELOG.md/,
];

/**
 * These are globally available dev dependencies.
 *
 * Packages that omit these dependencies will not be flagged for missing dependencies.
 *
 * Packages that list these dependencies will not be flagged for unused dependencies
 */
export const externalDependencies = [
  '@babel/*',
  '@emotion/*',
  '@leafygreen-ui/mongo-nav',
  '@leafygreen-ui/testing-lib',
  '@rollup/*',
  '@storybook/*',
  '@svgr/*',
  '@testing-library/*',
  '@types/*',
  '@typescript-eslint/*',
  'buffer',
  'eslint*',
  'jest',
  'jest-*',
  'jest-axe',
  'prettier*',
  'prop-types',
  'react-*',
  'rollup*',
  'storybook-*',
  'typescript',
  '*-loader',
  '*-lint*',
];

export const depcheckOptions: depcheck.Options = {
  ignoreMatches: externalDependencies,
};
