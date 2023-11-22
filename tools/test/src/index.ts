#! /usr/bin/env node
/* eslint-disable no-console */
import { spawn, sync as spawnSync } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

export interface TestCommandOptions {
  ci: boolean;
  watch?: boolean;
  verbose?: boolean;
  config?: string;
  react17?: boolean;
}

export const test = (
  passThrough: Array<string> | string | undefined,
  options: TestCommandOptions,
) => {
  const rootDir = process.cwd();
  const { watch, ci, verbose, config: configParam, react17 } = options;
  const ciFlags = [
    '--no-cache',
    '--ci',
    '--runInBand',
    '--reporters=default',
    '--reporters=jest-junit',
  ];
  const passThroughOptions = passThrough
    ? typeof passThrough === 'string'
      ? [passThrough]
      : passThrough
    : [];

  const configFile = getConfigFile();
  const jestBinary = getJestBinary();

  const commandArgs = [
    ...[`--config`, configFile],
    ...[`--rootDir`, rootDir],
    watch ? '--watch' : '',
    verbose ? '--verbose' : '',
    ...(ci ? ciFlags : []),
    ...passThroughOptions,
  ].filter(v => v !== '');

  spawn(jestBinary, commandArgs, {
    env: {
      ...process.env,
      JEST_ENV: 'client',
    },
    stdio: 'inherit',
  }).on('exit', process.exit);

  /** Returns the correct Jest config file path */
  function getConfigFile(): string {
    if (configParam && fse.existsSync(configParam)) {
      return configParam; // Use the parameter if it exists
    }

    const localConfigFile = path.resolve(rootDir, 'jest.config.js');
    const defaultConfigFile = path.resolve(
      __dirname,
      '../config/jest.config.js',
    );
    const react17ConfigFile = path.resolve(
      __dirname,
      '../config/react17/jest.config.js',
    );

    if (react17) {
      if (fse.existsSync(react17ConfigFile)) {
        console.log('Using React 17 test config');
        verbose && console.log(react17ConfigFile);
        return react17ConfigFile; // If react17 flag was used, use that config
      } else {
        throw new Error('No React17 test config found');
      }
    }

    if (fse.existsSync(localConfigFile)) {
      return localConfigFile; // otherwise look for a config at the root
    }

    return defaultConfigFile; // fallback to the default config
  }

  /** Returns the path of the correct Jest binary */
  function getJestBinary(): string {
    const latestJestBinaryPath = path.resolve(
      rootDir,
      './node_modules/jest/bin/jest.js',
    );
    const react17JestBinaryPath = path.resolve(
      __dirname,
      '../node_modules/jest/bin/jest.js',
    );

    const jestBinary = react17 ? react17JestBinaryPath : latestJestBinaryPath;

    /** Verify version */
    const r17packagesFile = path.resolve(
      __dirname,
      '../config/react17/r17-packages.json',
    );
    const r17packagesString = fse.readFileSync(r17packagesFile, 'utf-8');
    const r17packages = JSON.parse(r17packagesString);
    const r17expectedJestVersion = r17packages.dependencies['jest'];

    const version = spawnSync(jestBinary, ['--version']).stdout.toString(
      'utf-8',
    );

    if (react17) {
      if (r17expectedJestVersion !== version) {
        throw new Error(
          `Incorrect Jest version installed. Expected ${r17expectedJestVersion}, using ${version}`,
        );
      }
    }

    console.log('Using Jest version', version);
    verbose && console.log('Jest binary path:', jestBinary);

    return jestBinary;
  }
};
