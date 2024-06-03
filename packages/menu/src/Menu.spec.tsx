import React from 'react';
import {
  act,
  getAllByRole as globalGetAllByRole,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuProps } from './Menu';
import { Menu, MenuItem, MenuSeparator } from '.';

const menuTestId = 'menu-test-id';
const trigger = <button data-testid="menu-trigger">trigger</button>;

function waitForTimeout(timeout = 500) {
  return new Promise(res => setTimeout(res, timeout));
}

function renderMenu(props: Omit<MenuProps, 'children'> = {}) {
  const utils = render(
    <>
      <div data-testid="backdrop" />
      <Menu {...props} data-testid={menuTestId}>
        <MenuItem data-testid="menu-item-a">Item A</MenuItem>
        <MenuSeparator />
        <MenuItem href="http://mongodb.design">Item B</MenuItem>
      </Menu>
    </>,
  );

  const backdrop = utils.getByTestId('backdrop');
  return { ...utils, backdrop };
}

describe('packages/menu', () => {
  describe('Rendering', () => {
    test.todo('trigger renders as a function');
    test.todo('trigger renders as a JSX element');
    test.todo('menu appears when trigger is a function');
    test.todo('menu appears when trigger is a JSX element');

    test('menu is opened by default when `initialOpen` is set to true', () => {
      const { getByText } = renderMenu({
        initialOpen: true,
        trigger,
      });

      const menuItem = getByText('Item B');

      expect(menuItem).toBeInTheDocument();
    });

    describe('controlled `open`', () => {
      const setOpen = jest.fn();
      test('menu renders when `open` prop is set', () => {
        const { getByTestId } = renderMenu({ open: true, setOpen });
        const menu = getByTestId(menuTestId);
        expect(menu).toBeInTheDocument();
      });

      test('renders all children', () => {
        const { getByText } = renderMenu({ open: true, setOpen });
        const menuItem = getByText('Item A');
        expect(menuItem).toBeInTheDocument();
      });

      test('first item is focused', () => {
        const { getByTestId } = renderMenu({ open: true, setOpen });
        const menu = getByTestId(menuTestId);
        const options = globalGetAllByRole(menu, 'menuitem');
        expect(options[0]).toHaveFocus();
      });

      test('uncontrolled if `open` prop is not set, with `setOpen` callback', async () => {
        const { getByTestId, getByText } = renderMenu({
          open: undefined,
          setOpen,
          trigger,
        });

        const button = getByTestId('menu-trigger');
        userEvent.click(button);

        const menuItem = getByText('Item B');

        expect(menuItem).toBeInTheDocument();

        userEvent.click(button);

        await waitForElementToBeRemoved(menuItem);
        expect(menuItem).not.toBeInTheDocument();
      });
    });
  });

  describe('Mouse interaction', () => {
    test('Clicking trigger opens menu', () => {
      const { getByRole, getByTestId } = renderMenu({
        trigger,
      });
      const button = getByRole('button');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      expect(menu).toBeInTheDocument();
    });

    test('Click handlers on parent elements fire', async () => {
      const parentHandler = jest.fn();
      const { getByTestId } = render(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div data-testid="parent" onClick={parentHandler}>
          <Menu trigger={trigger} data-testid={menuTestId}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </div>,
      );
      const button = getByTestId('menu-trigger');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);
      await waitFor(() => {
        expect(menu).toBeInTheDocument();
        expect(parentHandler).toHaveBeenCalled();
      });
    });

    test('clicking a menuitem does not close the menu', async () => {
      const { getByTestId } = renderMenu({
        trigger,
      });

      const button = getByTestId('menu-trigger');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      expect(menu).toBeInTheDocument();

      const menuItem = getByTestId('menu-item-a');
      userEvent.click(menuItem);

      await act(async () => await waitForTimeout());
      expect(menu).toBeInTheDocument();
    });

    test('clicking outside the menu closes the menu', async () => {
      const { getByTestId, backdrop } = renderMenu({
        trigger,
      });

      const button = getByTestId('menu-trigger');
      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      expect(menu).toBeInTheDocument();

      userEvent.click(backdrop);

      await waitForElementToBeRemoved(menu);
      expect(menu).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Interaction', () => {
    type Keys = 'esc' | 'tab';
    const closeKeys: Array<Array<Keys>> = [['esc'], ['tab']];

    const userEventInteraction = (menu: HTMLElement, key: Keys) => {
      if (key === 'tab') {
        userEvent.tab();
      } else {
        userEvent.type(menu, `{${key}}`);
      }
    };

    describe.each(closeKeys)('%s key', key => {
      test('Closes menu', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
        });
        const button = getByRole('button');
        userEvent.click(button);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(menu).not.toBeInTheDocument();
      });
      test('Returns focus to trigger {usePortal: true}', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
          usePortal: true,
        });
        const button = getByRole('button');
        userEvent.click(button);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(button).toHaveFocus();
      });

      test('Returns focus to trigger {usePortal: false}', async () => {
        const { getByRole, getByTestId } = renderMenu({
          trigger,
          usePortal: false,
        });
        const button = getByRole('button');
        userEvent.click(button);
        const menu = getByTestId(menuTestId);

        userEventInteraction(menu, key);
        await waitForElementToBeRemoved(menu);
        expect(button).toHaveFocus();
      });
    });

    describe('Arrow keys', () => {
      let menu: HTMLElement;
      let options: Array<HTMLElement>;

      beforeEach(() => {
        const { getByTestId } = renderMenu({ trigger });
        const triggerButton = getByTestId('menu-trigger');

        userEvent.click(triggerButton);
        menu = getByTestId(menuTestId);
        options = globalGetAllByRole(menu, 'menuitem');
      });

      describe('Down arrow', () => {
        test('highlights the next option in the menu', () => {
          userEvent.type(menu, '{arrowdown}');
          expect(options[1]).toHaveFocus();
        });
        test('cycles highlight to the top', () => {
          // programmatically set focus on last option
          options[options.length - 1].focus();
          userEvent.type(menu, '{arrowdown}');
          expect(options[0]).toHaveFocus();
        });
      });

      describe('Up arrow', () => {
        test('highlights the previous option in the menu', () => {
          // programmatically set focus on second option
          options[1].focus();
          userEvent.type(menu, '{arrowup}');
          expect(options[0]).toHaveFocus();
        });
        test('cycles highlight to the bottom', () => {
          userEvent.type(menu, '{arrowup}');
          expect(options[options.length - 1]).toHaveFocus();
        });
      });
    });

    test('pressing enter on a menuitem does not close the menu', async () => {
      const { getByTestId } = renderMenu({
        trigger,
      });

      const button = getByTestId('menu-trigger');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      expect(menu).toBeInTheDocument();

      const menuItem = getByTestId('menu-item-a');

      menuItem.focus();
      userEvent.keyboard('[Enter]');

      await act(async () => await waitForTimeout());
      expect(menu).toBeInTheDocument();
    });

    test('pressing space on a menuitem does not close the menu', async () => {
      const { getByTestId } = renderMenu({
        trigger,
      });

      const button = getByTestId('menu-trigger');

      userEvent.click(button);
      const menu = getByTestId(menuTestId);

      expect(menu).toBeInTheDocument();

      const menuItem = getByTestId('menu-item-a');

      menuItem.focus();
      userEvent.keyboard('[Space]');

      await act(async () => await waitForTimeout());
      expect(menu).toBeInTheDocument();
    });
  });
});
