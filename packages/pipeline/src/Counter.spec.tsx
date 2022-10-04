import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Counter from './Counter';
import { Size } from './types';

const className = 'test-counter-class';

function renderCounter(props = {}) {
  const utils = render(<Counter {...props} size={Size.XSmall} />);

  if (!typeIs.element(utils.container.firstChild)) {
    throw new Error('Counter element not found');
  }

  return {
    ...utils,
    element: utils.container.firstChild,
  };
}

afterAll(cleanup);

describe('packages/pipeline/Counter', () => {
  test(`renders "${className}" in the stage's classList`, () => {
    const { element } = renderCounter({ className });
    expect(element.classList.contains(className)).toBe(true);
  });
});
