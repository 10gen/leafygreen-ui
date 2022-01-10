/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-standalone-expect */
/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelection"] }] */
import {
  waitForElementToBeRemoved,
  act,
  waitFor,
  queryByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { flatten, isUndefined, startCase } from 'lodash';
import {
  defaultOptions,
  groupedOptions,
  NestedObject,
  renderCombobox,
  Select,
  testif,
} from './ComboboxTestUtils';
import { OptionObject } from './util';

/**
 * Tests
 */
describe('packages/combobox', () => {
  describe('A11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container, inputEl } = renderCombobox();
      act(() => inputEl.focus()); // we focus the input to ensure the listbox gets rendered
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // DarkMode prop
  test.todo('Darkmode prop applies the correct styles');

  // size prop
  test.todo('Size prop applies the correct styles');

  /**
   * Overflow prop
   */
  test.todo('expand-y');
  test.todo('expand-x');
  test.todo('scroll-x');

  const tests = [['single'], ['multiple']] as Array<Array<Select>>;

  describe.each(tests)('%s select', select => {
    /** Run tests for single select only */
    const testSingleSelect = (name: string, fn?: jest.ProvidesCallback) =>
      isUndefined(fn) ? test.todo(name) : testif(select === 'single')(name, fn);

    /** Run tests for multi-select only */
    const testMultiSelect = (name: string, fn?: jest.ProvidesCallback) =>
      isUndefined(fn)
        ? test.todo(name)
        : testif(select === 'multiple')(name, fn);

    describe('Basic rendering', () => {
      // Label prop
      test('Label is rendered', () => {
        const { labelEl } = renderCombobox(select, { label: 'Some label' });
        expect(labelEl).toBeInTheDocument();
      });

      // Desctiption prop
      test('Description is rendered', () => {
        const description = 'Lorem ipsum';
        const { queryByText } = renderCombobox(select, { description });
        const descriptionEl = queryByText(description);
        expect(descriptionEl).not.toBeNull();
        expect(descriptionEl).toBeInTheDocument();
      });

      // Placeholder prop
      test('Placeholder is rendered', () => {
        const placeholder = 'Placeholder text';
        const { inputEl } = renderCombobox(select, { placeholder });
        expect(inputEl.placeholder).toEqual(placeholder);
      });

      // errorMessage & state prop
      test('Error message is rendered when state == `error`', () => {
        const errorMessage = 'Some error message';
        const { queryByText } = renderCombobox(select, {
          errorMessage,
          state: 'error',
        });
        const errorEl = queryByText(errorMessage);
        expect(errorEl).not.toBeNull();
        expect(errorEl).toBeInTheDocument();
      });

      test('Error message is not rendered when state !== `error`', () => {
        const errorMessage = 'Some error message';
        const { queryByText } = renderCombobox(select, {
          errorMessage,
        });
        const errorEl = queryByText(errorMessage);
        expect(errorEl).not.toBeInTheDocument();
      });

      // Clear button
      test('Clear button is rendered when selection is set', () => {
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          initialValue,
        });
        expect(clearButtonEl).toBeInTheDocument();
      });

      test('Clear button is not rendered when there is no selection', () => {
        const { clearButtonEl } = renderCombobox(select);
        expect(clearButtonEl).not.toBeInTheDocument();
      });

      test('Clear button is not rendered when clearable == `false`', () => {
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          initialValue,
          clearable: false,
        });
        expect(clearButtonEl).not.toBeInTheDocument();
      });
    });

    /**
     * Option Rendering
     */
    describe('Option rendering', () => {
      test('All options render in the menu', () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).toHaveLength(defaultOptions.length);
      });

      test('Options render with provided displayName', async () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        // Note on `foo!` operator https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
        Array.from(optionElements!).forEach((optionEl, index) => {
          expect(optionEl).toHaveTextContent(defaultOptions[index].displayName);
        });
      });

      test('Option is rendered with provided value when no displayName is provided', () => {
        const options = [{ value: 'abc-def' }];
        // @ts-expect-error `options` will not match the expected type
        const { openMenu } = renderCombobox(select, { options });
        const { optionElements } = openMenu();
        const [optionEl] = Array.from(optionElements!);
        expect(optionEl).toHaveTextContent('abc-def');
      });
      // Grouped Options
      describe('Grouped Options', () => {
        test('Grouped items should render', () => {
          const { openMenu } = renderCombobox(select, {
            options: groupedOptions,
          });
          const { menuContainerEl } = openMenu();

          flatten(
            groupedOptions.map(({ children }: NestedObject) => children),
          ).forEach((option: OptionObject | string) => {
            const displayName =
              typeof option === 'string' ? option : option.displayName;
            const optionEl = queryByText(menuContainerEl!, displayName);
            expect(optionEl).toBeInTheDocument();
          });
        });

        test('Grouped item labels should render', () => {
          const { openMenu } = renderCombobox(select, {
            options: groupedOptions,
          });
          const { menuContainerEl } = openMenu();

          const [fruitLabel, veggieLabel] = [
            queryByText(menuContainerEl!, 'Fruit'),
            queryByText(menuContainerEl!, 'Vegetables'),
          ];
          expect(fruitLabel).toBeInTheDocument();
          expect(veggieLabel).toBeInTheDocument();
        });
      });
    });

    describe('When disabled', () => {
      // disabled prop
      test('Combobox is not clickable when `disabled`', () => {
        const { comboboxEl } = renderCombobox(select, { disabled: true });
        userEvent.click(comboboxEl);
        expect(document.body).toHaveFocus();
      });

      test('Combobox is not focusable when `disabled`', () => {
        renderCombobox(select, { disabled: true });
        userEvent.type(document.body, '{tab');
        expect(document.body).toHaveFocus();
      });
    });

    /**
     * Initial Value
     */
    describe('#initialValue prop', () => {
      testSingleSelect('Initial value prop renders text input value', () => {
        const initialValue = 'apple';
        const { inputEl } = renderCombobox(select, { initialValue });
        expect(inputEl).toHaveValue('Apple');
      });

      testMultiSelect('Initial value prop renders chips', () => {
        const initialValue = ['apple', 'banana'];
        const { queryChipsByName, queryAllChips } = renderCombobox(select, {
          initialValue,
        });
        waitFor(() => {
          const allChips = queryChipsByName(['Apple', 'Banana']);
          allChips?.forEach(chip => expect(chip).toBeInTheDocument());
          expect(queryAllChips()).toHaveLength(2);
        });
      });

      testSingleSelect(
        'Selected single select option renders with a checkmark icon',
        () => {
          const initialValue = 'apple';
          const { openMenu } = renderCombobox('single', { initialValue });
          const { selectedElements } = openMenu();
          expect(selectedElements?.querySelector('svg')).not.toBeNull();
        },
      );

      testMultiSelect(
        'Each multiple select option renders with a checkbox input',
        () => {
          const initialValue = ['apple', 'banana'];
          const { openMenu } = renderCombobox('multiple', { initialValue });
          const { selectedElements } = openMenu();
          expect(
            selectedElements?.every(element => element?.querySelector('input')),
          ).toBeTruthy();
        },
      );
    });

    /**
     * Controlled
     * (i.e. `value` prop)
     */
    describe('When value is controlled', () => {
      testSingleSelect('Text input renders with value update', () => {
        let value = 'apple';
        const { inputEl, rerenderCombobox } = renderCombobox(select, {
          value,
        });
        expect(inputEl).toHaveValue('Apple');
        value = 'banana';
        rerenderCombobox({ value });
        expect(inputEl).toHaveValue('Banana');
      });

      testSingleSelect('Invalid option passed as value is not selected', () => {
        const value = 'jellybean';
        const { inputEl } = renderCombobox(select, { value });
        expect(inputEl).toHaveValue('');
      });

      testMultiSelect('Updating `value` updates the chips', () => {
        let value = ['apple', 'banana'];
        const {
          queryChipsByName,
          queryAllChips,
          rerenderCombobox,
        } = renderCombobox(select, {
          value,
        });
        waitFor(() => {
          const allChips = queryChipsByName(['Apple', 'Banana']);
          allChips?.forEach(chip => expect(chip).toBeInTheDocument());
          expect(queryAllChips()).toHaveLength(2);
          value = ['banana', 'carrot'];
          rerenderCombobox({ value });
          waitFor(() => {
            const allChips = queryChipsByName(['Carrot', 'Banana']);
            allChips?.forEach(chip => expect(chip).toBeInTheDocument());
            expect(queryAllChips()).toHaveLength(2);
          });
        });
      });

      testMultiSelect('Invalid options are not selected', () => {
        const value = ['apple', 'jellybean'];
        const { queryChipsByName, queryAllChips } = renderCombobox(select, {
          value,
        });
        waitFor(() => {
          const allChips = queryChipsByName(['Apple']);
          allChips?.forEach(chip => expect(chip).toBeInTheDocument());
          expect(queryChipsByName('Jellybean')).not.toBeInTheDocument();
          expect(queryAllChips()).toHaveLength(1);
        });
      });
    });

    /**
     * Mouse interaction
     */
    describe('Mouse interaction', () => {
      test('Menu is not initially opened', () => {
        const { getMenuElements } = renderCombobox(select);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('Clicking the combobox sets focus to the input', () => {
        const { comboboxEl, inputEl } = renderCombobox(select);
        userEvent.click(comboboxEl);
        expect(inputEl).toHaveFocus();
      });

      test('Menu appears when input is focused', () => {
        const { inputEl, getMenuElements } = renderCombobox(select);
        act(() => inputEl.focus());
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('Menu appears when box is clicked', () => {
        const { comboboxEl, getMenuElements } = renderCombobox(select);
        userEvent.click(comboboxEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeNull();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('Menu closes on click-away', async () => {
        const { containerEl, openMenu } = renderCombobox(select);
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(menuContainerEl).not.toBeInTheDocument();
        expect(containerEl).not.toContainFocus();
      });

      testSingleSelect('Clicking selected option closes menu', async () => {
        const { openMenu } = renderCombobox(select, {
          initialValue: 'apple',
        });
        const { optionElements, menuContainerEl } = openMenu();
        expect(optionElements).not.toBeUndefined();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[0]);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('Menu does not close on interaction with the menu', () => {
        const { getMenuElements, openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).not.toBeUndefined();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[1]);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('Clicking an option sets selection', () => {
        const { openMenu, queryChipsByName, inputEl } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).not.toBeUndefined();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[2]);
        if (select === 'multiple') {
          expect(queryChipsByName('Carrot')).toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Carrot');
        }
      });

      testSingleSelect(
        'Input value is set to selection value when menu closes',
        () => {
          const initialValue = 'apple';
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, '{backspace}{backspace}{esc}');
          expect(inputEl).toHaveValue('Apple');
        },
      );

      testMultiSelect('Clicking chip X button removes option', async () => {
        const initialValue = ['apple', 'banana', 'carrot'];
        const { queryChipsByName, queryAllChips } = renderCombobox(select, {
          initialValue,
        });
        const appleChip = queryChipsByName('Apple');
        expect(appleChip).not.toBeNull();
        const appleChipButton = appleChip!.querySelector('button')!;
        userEvent.click(appleChipButton);
        await waitFor(() => {
          expect(appleChip).not.toBeInTheDocument();
          const allChips = queryChipsByName(['Banana', 'Carrot']);
          allChips?.forEach(chip => expect(chip).toBeInTheDocument());
          expect(queryAllChips()).toHaveLength(2);
        });
      });

      testMultiSelect('Clicking chip text focuses the chip', () => {
        const initialValue = ['apple', 'banana', 'carrot'];
        const { queryChipsByName, queryAllChips } = renderCombobox(select, {
          initialValue,
        });
        const appleChip = queryChipsByName('Apple');
        userEvent.click(appleChip!);
        expect(appleChip!).toContainFocus();
        expect(queryAllChips()).toHaveLength(3);
      });

      testMultiSelect(
        'Clicking chip X button does nothing when disabled',
        async () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryChipsByName, queryAllChips } = renderCombobox(select, {
            initialValue,
            disabled: true,
          });
          const carrotChip = queryChipsByName('Carrot');
          const carrotChipButton = carrotChip!.querySelector('button');
          userEvent.click(carrotChipButton!);
          await waitFor(() => {
            expect(queryAllChips()).toHaveLength(3);
          });
        },
      );

      testMultiSelect(
        'Removing a chip sets focus to the next chip',
        async () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryChipsByName } = renderCombobox(select, {
            initialValue,
          });
          const appleChip = queryChipsByName('Apple');
          const bananaChip = queryChipsByName('Banana');
          const appleChipButton = appleChip!.querySelector('button');
          const bananaChipButton = bananaChip!.querySelector('button');
          userEvent.click(appleChipButton!);
          await waitFor(() => {
            expect(appleChip).not.toBeInTheDocument();
            expect(bananaChipButton!).toHaveFocus();
          });
        },
      );

      test('Clicking clear all button clears selection', () => {
        const initialValue =
          select === 'single' ? 'apple' : ['apple', 'banana', 'carrot'];
        const { inputEl, clearButtonEl, queryAllChips } = renderCombobox(
          select,
          {
            initialValue,
          },
        );
        expect(clearButtonEl).not.toBeNull();
        userEvent.click(clearButtonEl!);
        if (select === 'multiple') {
          expect(queryAllChips()).toHaveLength(0);
        } else {
          expect(inputEl).toHaveValue('');
        }
      });

      test('Clicking clear all button does nothing when disabled', () => {
        const initialValue =
          select === 'single' ? 'apple' : ['apple', 'banana', 'carrot'];
        const { inputEl, clearButtonEl, queryAllChips } = renderCombobox(
          select,
          {
            initialValue,
            disabled: true,
          },
        );
        expect(clearButtonEl).not.toBeNull();
        userEvent.click(clearButtonEl!);
        if (select === 'multiple') {
          expect(queryAllChips()).toHaveLength(initialValue.length);
        } else {
          expect(inputEl).toHaveValue(startCase(initialValue as string));
        }
      });

      testSingleSelect(
        "Unfocusing the menu should keep text if it's a valid selection",
        async () => {
          const { inputEl, containerEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, 'Apple');
          userEvent.click(document.body);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(containerEl).not.toContainFocus();
          expect(inputEl).toHaveValue('Apple');
        },
      );

      testSingleSelect(
        'Unfocusing the menu should NOT keep text if not a valid selection',
        async () => {
          const { inputEl, containerEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, 'abc');
          userEvent.click(document.body);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(containerEl).not.toContainFocus();
          expect(inputEl).toHaveValue('');
        },
      );

      testMultiSelect(
        'Unfocusing the menu should keep text as typed',
        async () => {
          const { inputEl, containerEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, 'abc');
          userEvent.click(document.body);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(containerEl).not.toContainFocus();
          expect(inputEl).toHaveValue('abc');
        },
      );

      test.todo(
        'Clicking in the middle of the input text should set the cursor there',
      );
    });

    /**
     * Keyboard navigation
     */
    describe('Keyboard interaction', () => {
      test('First option is highlighted on menu open', () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).not.toBeUndefined();
        expect(
          (optionElements as HTMLCollectionOf<HTMLLIElement>)[0],
        ).toHaveAttribute('aria-selected', 'true');
      });

      test('Enter key selects highlighted option', () => {
        const { inputEl, openMenu, queryChipsByName } = renderCombobox(select);
        openMenu();
        userEvent.type(inputEl!, '{arrowdown}{enter}');
        if (select === 'multiple') {
          expect(queryChipsByName('Banana')).toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Banana');
        }
      });

      test('Space key selects highlighted option', () => {
        const { inputEl, openMenu, queryChipsByName } = renderCombobox(select);
        openMenu();
        userEvent.type(inputEl, '{arrowdown}{space}');
        if (select === 'multiple') {
          expect(queryChipsByName('Banana')).toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Banana');
        }
      });

      test('Escape key closes menu', async () => {
        const { inputEl, openMenu } = renderCombobox(select);
        const { menuContainerEl } = openMenu();
        userEvent.type(inputEl, '{esc}');
        await waitForElementToBeRemoved(menuContainerEl);
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      describe('Tab key', () => {
        test('Closes menu when no selection is made', async () => {
          const { openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.tab();
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('Focuses clear button when it exists', async () => {
          const initialValue = select === 'multiple' ? ['apple'] : 'apple';
          const { clearButtonEl, openMenu } = renderCombobox(select, {
            initialValue,
          });
          openMenu();
          userEvent.tab();
          expect(clearButtonEl).toHaveFocus();
        });

        testMultiSelect('Focuses next Chip when a Chip is selected', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryAllChips } = renderCombobox(select, { initialValue });
          const [firstChip, secondChip] = queryAllChips();
          userEvent.click(firstChip);
          userEvent.tab();
          expect(secondChip).toContainFocus();
        });

        testMultiSelect('Focuses input when the last Chip is selected', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { inputEl, queryChipsByIndex } = renderCombobox(select, {
            initialValue,
          });
          const lastChip = queryChipsByIndex('last');
          userEvent.click(lastChip!);
          userEvent.tab();
          expect(inputEl).toHaveFocus();
        });
      });

      describe('Backspace key', () => {
        test('Deletes text when cursor is NOT at beginning of selection', () => {
          const { inputEl } = renderCombobox(select);
          userEvent.type(inputEl, 'app{backspace}');
          expect(inputEl).toHaveFocus();
          expect(inputEl).toHaveValue('ap');
        });

        testSingleSelect(
          'Deletes text after making a single selection',
          async () => {
            const { inputEl, openMenu } = renderCombobox('single');
            const { optionElements, menuContainerEl } = openMenu();
            const firstOption = optionElements![0];
            userEvent.click(firstOption);
            await waitForElementToBeRemoved(menuContainerEl);
            userEvent.type(inputEl, '{backspace}');
            expect(inputEl).toHaveFocus();
            expect(inputEl).toHaveValue('Appl');
          },
        );

        testMultiSelect(
          'Focuses last chip when cursor is at beginning of selection',
          () => {
            const initialValue = ['apple'];
            const { inputEl, queryAllChips } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(inputEl, '{backspace}');
            expect(queryAllChips()).toHaveLength(1);
            expect(queryAllChips()[0]).toContainFocus();
          },
        );

        testMultiSelect('Focuses last Chip after making a selection', () => {
          const { inputEl, openMenu, queryAllChips } = renderCombobox(select);
          const { optionElements } = openMenu();
          const firstOption = optionElements![0];
          userEvent.click(firstOption);
          userEvent.type(inputEl, '{backspace}');
          expect(queryAllChips()).toHaveLength(1);
          expect(queryAllChips()[0]).toContainFocus();
        });
      });

      describe('Up & Down arrow keys', () => {
        test('Down arrow moves highlight down', async () => {
          const { inputEl, openMenu, findByRole } = renderCombobox(select);
          openMenu();
          userEvent.type(inputEl, '{arrowdown}');
          const highlight = await findByRole('option', {
            selected: true,
          });
          expect(highlight).toHaveTextContent('Banana');
        });

        test('Up arrow moves highlight up', async () => {
          const { inputEl, openMenu, findByRole } = renderCombobox(select);
          openMenu();
          userEvent.type(inputEl, '{arrowdown}{arrowdown}{arrowup}');
          const highlight = await findByRole('option', {
            selected: true,
          });
          expect(highlight).toHaveTextContent('Banana');
        });

        test('Down arrow key opens menu when its closed', async () => {
          const { inputEl, openMenu, findByRole } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          expect(inputEl).toHaveFocus();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
          userEvent.type(inputEl, '{arrowdown}');
          const reOpenedMenu = await findByRole('listbox');
          expect(reOpenedMenu).toBeInTheDocument();
        });
      });

      describe('Left arrow key', () => {
        testMultiSelect(
          'When cursor is at the beginning of input, Left arrow focuses last chip',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByIndex, inputEl } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(inputEl, '{arrowleft}');
            const lastChip = queryChipsByIndex('last');
            expect(lastChip).toContainFocus();
          },
        );
        testSingleSelect(
          'When cursor is at the beginning of input, Left arrow does nothing',
          () => {
            const { inputEl } = renderCombobox(select);
            userEvent.type(inputEl, '{arrowleft}');
            waitFor(() => expect(inputEl).toHaveFocus());
          },
        );
        test('If cursor is NOT at the beginning of input, Left arrow key moves cursor', () => {
          const { inputEl } = renderCombobox(select);
          userEvent.type(inputEl, 'abc{arrowleft}');
          waitFor(() => expect(inputEl).toHaveFocus());
        });

        test.skip('When focus is on clear button, Left arrow moves focus to input', async () => {
          const initialValue = select === 'multiple' ? ['apple'] : 'apple';
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl!, '{arrowright}{arrowleft}');
          expect(inputEl!).toHaveFocus();
          expect(inputEl!.selectionEnd).toEqual(select === 'multiple' ? 0 : 5);
        });

        testMultiSelect(
          'When focus is on a chip, Left arrow focuses prev chip',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByIndex, inputEl } = renderCombobox(select, {
              initialValue,
            });
            const secondChip = queryChipsByIndex(1);
            userEvent.type(inputEl, '{arrowleft}{arrowleft}');
            expect(secondChip).toContainFocus();
          },
        );
        testMultiSelect(
          'When focus is on the first chip, Left arrrow does nothing',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryAllChips, inputEl } = renderCombobox(select, {
              initialValue,
            });
            const [firstChip] = queryAllChips();
            userEvent.type(
              inputEl,
              '{arrowleft}{arrowleft}{arrowleft}{arrowleft}',
            );
            expect(firstChip).toContainFocus();
          },
        );
      });

      describe('Right arrow key', () => {
        test('Does nothing when focus is on clear button', () => {
          const initialValue =
            select === 'multiple' ? ['apple', 'banana', 'carrot'] : 'apple';
          const { inputEl, clearButtonEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, '{arrowright}{arrowright}');
          expect(clearButtonEl).toHaveFocus();
        });

        test('Focuses clear button when cursor is at the end of input', () => {
          const initialValue =
            select === 'multiple' ? ['apple', 'banana', 'carrot'] : 'apple';
          const { inputEl, clearButtonEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, '{arrowright}');
          expect(clearButtonEl).toHaveFocus();
        });

        test('Moves cursor when cursor is NOT at the end of input', () => {
          const initialValue =
            select === 'multiple' ? ['apple', 'banana', 'carrot'] : 'apple';
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, 'abc{arrowleft}{arrowright}');
          expect(inputEl).toHaveFocus();
        });

        testMultiSelect('Focuses input when focus is on last chip', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(
            inputEl!,
            'abc{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowright}',
          );
          expect(inputEl!).toHaveFocus();
          // This behavior passes in the browser, but not in jest
          // expect(inputEl!.selectionStart).toEqual(0);
        });

        testMultiSelect('Focuses next chip when focus is on a chip', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { inputEl, queryChipsByIndex } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl!, '{arrowleft}{arrowleft}{arrowright}');
          const lastChip = queryChipsByIndex('last');
          expect(lastChip!).toContainFocus();
        });
      });

      describe('Remove chips with keyboard', () => {
        let comboboxEl: HTMLElement,
          queryAllChips: () => Array<HTMLElement>,
          chipButton: HTMLElement;

        beforeEach(() => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const combobox = renderCombobox(select, {
            initialValue,
          });
          comboboxEl = combobox.comboboxEl;
          userEvent.type(comboboxEl, '{arrowleft}');
          queryAllChips = combobox.queryAllChips;
          const chip = combobox.queryChipsByName('Carrot');
          if (!chip) throw new Error('Carrot Chip not found');
          chipButton = chip.querySelector('button') as HTMLElement;
        });

        testMultiSelect('Enter key', () => {
          userEvent.type(chipButton, '{enter}');
          waitFor(() => expect(queryAllChips()).toHaveLength(2));
        });
        testMultiSelect('Backspace key', () => {
          userEvent.type(chipButton, '{backspace}');
          waitFor(() => expect(queryAllChips()).toHaveLength(2));
        });
        testMultiSelect('Space key', () => {
          userEvent.type(chipButton, '{space}');
          waitFor(() => expect(queryAllChips()).toHaveLength(2));
        });
      });
    });

    /**
     * Filtered options
     */
    test('Providing filteredOptions limits the rendered options', () => {
      const { openMenu } = renderCombobox(select, {
        filteredOptions: ['apple'],
      });
      const { optionElements } = openMenu();
      expect(optionElements!.length).toEqual(1);
    });

    /**
     * onClear
     */
    test('Clear button calls onClear callback', () => {
      const initialValue = select === 'multiple' ? ['apple'] : 'apple';
      const onClear = jest.fn();
      const { clearButtonEl } = renderCombobox(select, {
        initialValue,
        onClear,
      });
      userEvent.click(clearButtonEl!);
      expect(onClear).toHaveBeenCalled();
    });

    /**
     * onChange
     */
    describe('onChange', () => {
      test('Selecting an option calls onChange callback', () => {
        const onChange = jest.fn();
        const { openMenu } = renderCombobox(select, { onChange });
        const { optionElements } = openMenu();
        userEvent.click(optionElements![0]);
        waitFor(() => {
          expect(onChange).toHaveBeenCalled();
        });
      });

      test('Clearing selection calls onChange callback', () => {
        const onChange = jest.fn();
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          onChange,
          initialValue,
        });
        userEvent.click(clearButtonEl!);
        expect(onChange).toHaveBeenCalled();
      });

      test('Typing does not call onChange callback', () => {
        const onChange = jest.fn();
        const { inputEl } = renderCombobox(select, { onChange });
        userEvent.type(inputEl, 'a');
        expect(onChange).not.toHaveBeenCalled();
      });

      test('Closing the menu without making a selection does not call onChange callback', async () => {
        const onChange = jest.fn();
        const { containerEl, openMenu } = renderCombobox(select, { onChange });
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    /**
     * onFilter
     */
    describe('onFilter', () => {
      test('Typing calls onFilter callback on each keystroke', () => {
        const onFilter = jest.fn();
        const { inputEl } = renderCombobox(select, { onFilter });
        userEvent.type(inputEl, 'app');
        expect(onFilter).toHaveBeenCalledTimes(3);
      });
      test('Clearing selection calls onFilter callback once', () => {
        const onFilter = jest.fn();
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          onFilter,
          initialValue,
        });
        userEvent.click(clearButtonEl!);
        expect(onFilter).toHaveBeenCalledTimes(1);
      });
      test('Selecting an option does not call onFilter callback', () => {
        const onFilter = jest.fn();
        const { openMenu } = renderCombobox(select, { onFilter });
        const { optionElements } = openMenu();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[0]);
        expect(onFilter).not.toHaveBeenCalled();
      });
      test('Closing the menu does not call onFilter callback', async () => {
        const onFilter = jest.fn();
        const { containerEl, openMenu } = renderCombobox(select, { onFilter });
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(onFilter).not.toHaveBeenCalled();
      });
    });

    /**
     * Search State messages & filteredOptions
     */
    describe('Search states', () => {
      test('Menu renders empty state message when there are no options provided', () => {
        const searchEmptyMessage = 'Empty state message';
        const { openMenu } = renderCombobox(select, {
          searchEmptyMessage,
          options: [],
        });
        const { menuContainerEl } = openMenu();
        const emptyStateTextEl = queryByText(
          menuContainerEl!,
          searchEmptyMessage,
        );
        expect(emptyStateTextEl).toBeInTheDocument();
      });

      // Unsure if this is the desired behavior
      test.skip('Menu renders empty state message when filtered options is empty', () => {
        const searchEmptyMessage = 'Empty state message';
        const { openMenu } = renderCombobox(select, {
          searchEmptyMessage,
          filteredOptions: [],
        });
        const { menuContainerEl } = openMenu();
        const emptyStateTextEl = queryByText(
          menuContainerEl!,
          searchEmptyMessage,
        );
        expect(emptyStateTextEl).toBeInTheDocument();
      });

      test('Menu renders loading state message `searchState` == `loading`', () => {
        const searchLoadingMessage = 'Loading state message';
        const { openMenu } = renderCombobox(select, {
          searchLoadingMessage,
          searchState: 'loading',
        });
        const { menuContainerEl } = openMenu();
        const loadingStateTextEl = queryByText(
          menuContainerEl!,
          searchLoadingMessage,
        );
        expect(loadingStateTextEl).toBeInTheDocument();
      });

      test('Menu renders error state message `searchState` == `error`', () => {
        const searchErrorMessage = 'Error state message';
        const { openMenu } = renderCombobox(select, {
          searchErrorMessage,
          searchState: 'error',
        });
        const { menuContainerEl } = openMenu();
        const errorStateTextEl = queryByText(
          menuContainerEl!,
          searchErrorMessage,
        );
        expect(errorStateTextEl).toBeInTheDocument();
      });
    });

    // Filtering
    test('Menu options list narrows when text is entered', async () => {
      const { inputEl, openMenu, findAllByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(inputEl, 'c');
      const optionElements = await findAllByRole('option');
      expect(optionElements.length).toEqual(1);
    });
  });

  describe('Chips', () => {
    const ellipsis = '…';
    const options = [
      'loremipsumdolor',
      'sitametconsectetur',
      'anotherlongoption',
    ];

    test('Chips truncate at the beginning', () => {
      const { queryAllChips } = renderCombobox('multiple', {
        options,
        initialValue: ['loremipsumdolor'],
        chipTruncationLocation: 'start',
      });
      const firstChipEl = queryAllChips()[0];
      expect(firstChipEl).toHaveTextContent(ellipsis + 'psumdolor');
    });

    test('Chips truncate in the middle', () => {
      const { queryAllChips } = renderCombobox('multiple', {
        options,
        initialValue: ['loremipsumdolor'],
        chipTruncationLocation: 'middle',
      });
      const [firstChipEl] = queryAllChips();
      expect(firstChipEl).toHaveTextContent('lore' + ellipsis + 'dolor');
    });
    test('Chips truncate at the end', () => {
      const { queryAllChips } = renderCombobox('multiple', {
        options,
        initialValue: ['loremipsumdolor'],
        chipTruncationLocation: 'end',
      });
      const [firstChipEl] = queryAllChips();
      expect(firstChipEl).toHaveTextContent('loremipsu' + ellipsis);
    });

    test('Chips truncate to the provided length', () => {
      const { queryAllChips } = renderCombobox('multiple', {
        options,
        initialValue: ['loremipsumdolor'],
        chipTruncationLocation: 'start',
        chipCharacterLimit: 8,
      });
      const [firstChipEl] = queryAllChips();
      expect(firstChipEl).toHaveTextContent(ellipsis + 'dolor');
    });
  });
});
