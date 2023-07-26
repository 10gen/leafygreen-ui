/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';

import { LintFn } from './lint.types';

const rootDir = process.cwd();
const eslintConfigPath = path.resolve(__dirname, '../config/eslint.config.js');
export const esLintExtensions = ['js', 'ts', 'tsx'];

/** Spawns an eslint job */
export const eslint: LintFn = ({ fix, verbose }) => {
  return new Promise<boolean>((resolve, reject) => {
    console.log(chalk.blue('Running ESLint...'));
    spawn(
      'eslint',
      [
        '--config',
        eslintConfigPath,
        `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
        fix ? '--fix' : '--no-fix',
        verbose ? '' : '--quiet',
      ],
      {
        stdio: 'inherit',
      },
    )
      .on('exit', code => {
        if (code === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on('error', reject);
  });
};
