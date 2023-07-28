#! /usr/bin/env node
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

export interface TestCommandOptions {
  ci: boolean;
  watch?: boolean;
  verbose?: boolean;
  testNamePattern?: string;
  config?: string;
}

export const test = (
  testFilesPattern: string | undefined,
  options: TestCommandOptions,
) => {
  const rootDir = process.cwd();
  const { watch, testNamePattern, ci, verbose, config: configParam } = options;
  const ciFlags = [
    '--no-cache',
    '--ci',
    '--runInBand',
    '--reporters=default',
    '--reporters=jest-junit',
  ];

  const localConfigFile = path.resolve(rootDir, 'jest.config.js');
  const defaultConfigFile = path.resolve(__dirname, '../config/jest.config.js');
  const configFile =
    configParam && fse.existsSync(configParam)
      ? configParam // Use the parameter if it exists
      : fse.existsSync(localConfigFile)
      ? localConfigFile // otherwise look for a config at the root
      : defaultConfigFile; // fallback to the default config

  const commandArgs = [
    testFilesPattern ?? '',
    `--config`,
    configFile,
    `--rootDir`,
    rootDir,
    watch ? '--watch' : '',
    verbose ? '--verbose' : '',
    testNamePattern ? `--testNamePattern=${testNamePattern}` : '',
    ...(ci ? ciFlags : []),
  ].filter(v => v !== '');

  spawn('jest', commandArgs, {
    env: {
      ...process.env,
      JEST_ENV: 'client',
    },
    stdio: 'inherit',
  }).on('exit', process.exit);
};
