import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Description, Label } from '@leafygreen-ui/typography';
import Popover from '@leafygreen-ui/popover';
import {
  useEventListener,
  useIdAllocator,
  usePrevious,
} from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { consoleOnce, isComponentType } from '@leafygreen-ui/lib';
import {
  clone,
  isArray,
  isNull,
  isUndefined,
  kebabCase,
  startCase,
} from 'lodash';
import {
  ComboboxProps,
  getDefaultIndex,
  getIsMultiselect,
  onChangeType,
  SelectIndexType,
  SelectValueType,
} from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';
import { InternalComboboxOption } from './ComboboxOption';
import Chip from './Chip';
import {
  comboboxParentStyle,
  comboboxStyle,
  endIcon,
  errorMessageStyle,
  inputElementStyle,
  inputWrapperStyle,
  interactionRingColor,
  interactionRingStyle,
  menuList,
  menuMessage,
  menuStyle,
  menuWrapperStyle,
} from './Combobox.styles';

/**
 * Component
 */
export default function Combobox<M extends boolean = false>({
  children,
  label,
  description,
  placeholder = 'Select',
  'aria-label': ariaLabel,
  disabled = false,
  size = 'default',
  darkMode = false,
  state = 'none',
  errorMessage,
  searchState = 'unset',
  searchEmptyMessage = 'No results found',
  searchErrorMessage = 'Could not get results!',
  searchLoadingMessage = 'Loading results...',
  onFilter,
  clearable = true,
  onClear,
  overflow = 'expand-y',
  chipTruncationLocation,
  className,
  multiselect,
  initialValue,
  onChange,
  updateValue,
  ...rest
}: ComboboxProps<M>) {
  const inputId = useIdAllocator({ prefix: 'combobox-input' });
  const labelId = useIdAllocator({ prefix: 'combobox-label' });
  const menuId = useIdAllocator({ prefix: 'combobox-menu' });

  const comboboxRef = useRef<HTMLDivElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState<number | null>(0);
  const [selection, setSelection] = useState<SelectIndexType<M> | null>(null);
  const prevSelection = usePrevious(selection);

  // const isMultiselect = getIsMultiselect(multiselect);

  const isMultiselect = useCallback(
    (selection: Array<number> | number | null): selection is Array<number> =>
      multiselect && !isNull(selection) && isArray(selection),
    [multiselect],
  );

  // Utility to force selection
  const setInputFocus = useCallback(() => {
    if (!disabled) {
      inputRef?.current?.focus();
    }
  }, [disabled]);

  const setInputValue = (value: string) => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  };

  // Utility function to handle mulit & single select
  const toggleSelection = useCallback(
    (index: number) => {
      // MULTISELECT
      if (isMultiselect(selection)) {
        if (selection.includes(index)) {
          // remove from array
          const newSelection: SelectIndexType<M> = clone(selection);
          newSelection.splice(newSelection.indexOf(index), 1);
          setSelection(newSelection);
        } else {
          // add to array
          const newSelection: SelectIndexType<M> = clone(selection);
          newSelection.push(index);
          setSelection(newSelection);
          // clear text
          setInputValue('');
        }
      } else {
        // SINGLE SELECT
        setSelection(index as SelectIndexType<M>);
      }
      setInputFocus();
    },
    [isMultiselect, selection, setInputFocus],
  );

  const clearSelection = useCallback(() => {
    setSelection(getDefaultIndex(multiselect));
  }, [multiselect]);

  const scrollToEnd = () => {
    if (inputWrapperRef.current) {
      inputWrapperRef.current.scrollLeft = inputWrapperRef.current?.scrollWidth;
    }
  };

  /**
   * We listen for when `isOpen` changes, and then set a new variable
   * that triggers the menu to re-render. We need this because
   * the width of `input` gets updated after the menu is opened.
   * This change doesn't get caught in the initial render of the menu,
   * leading to issues when this change pops `input` to a new line.
   * Note: useMemo is fired too early. Need to use useState & useEffect
   */
  const [hasMenuBeenOpened, setHasMenuBeenOpened] = useState(false);
  useEffect(() => setHasMenuBeenOpened(isOpen), [isOpen]);

  // TODO - handle internal filtering

  const renderedOptions = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (isComponentType(child, 'ComboboxOption')) {
        const {
          value: valueProp,
          displayName: nameProp,
          className,
          glyph,
        } = child.props;

        const value = valueProp ?? kebabCase(nameProp);
        const displayName = nameProp ?? startCase(value);
        // const childChildren = childChildrenProp ?? nameProp ?? startCase(value);

        const isFocused = focusedOption === index;
        const isSelected = isMultiselect(selection)
          ? selection.includes(index)
          : selection === index;

        const setSelected = () => {
          toggleSelection(index);
        };

        return (
          <InternalComboboxOption
            value={value}
            displayName={displayName}
            isFocused={isFocused}
            isSelected={isSelected}
            setSelected={setSelected}
            glyph={glyph}
            className={className}
          />
        );
      } else if (isComponentType(child, 'ComboboxGroup')) {
        // TODO - handle nesting
      }
    });
  }, [children, focusedOption, isMultiselect, selection, toggleSelection]);

  const getIndexOfOption = (value: string): number | undefined => {
    const index =
      renderedOptions?.findIndex(({ props }) => props.value === value) ?? -1;

    if (index >= 0) {
      return index;
    } else {
      consoleOnce.error(
        `Error in Combobox: Could not find value "${value}" in options`,
      );
    }
  };

  const getValueAtIndex = useCallback(
    (index: number): string | undefined => {
      const value = renderedOptions?.[index].props.displayName ?? '';

      if (value) {
        return value;
      } else {
        consoleOnce.error(`Error in Combobox: No option at index ${index}`);
      }
    },
    [renderedOptions],
  );

  const getValueOfSelection = useCallback(
    (selection: number | Array<number>): string | Array<string> | undefined => {
      if (isMultiselect(selection)) {
        return selection
          .map(index => getValueAtIndex(index))
          .filter(value => !isUndefined(value)) as Array<string>;
      } else if (!isArray(selection)) {
        return getValueAtIndex(selection);
      }
    },
    [getValueAtIndex, isMultiselect],
  );

  // Set initialValue
  useEffect(() => {
    if (initialValue) {
      if (isArray(initialValue)) {
        const indexArray = initialValue
          .map(value => getIndexOfOption(value))
          .filter((index): index is number => !isUndefined(index));

        setSelection(indexArray as SelectIndexType<M>);
      } else {
        const index = getIndexOfOption(initialValue);

        if (!isUndefined(index)) {
          setSelection(index as SelectIndexType<M>);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the selection changes...
  useEffect(() => {
    if (!isNull(selection) && selection !== prevSelection) {
      const value = getValueOfSelection(selection);

      if (!isUndefined(value)) {
        if (isMultiselect(selection) && isArray(value)) {
          // Scroll the wrapper to the end. No effect if not `overflow="scroll-x"`
          scrollToEnd();
          (onChange as onChangeType<true>)?.(value);
        } else if (!isArray(value)) {
          // Update the text input
          setInputValue(value ?? '');
          (onChange as onChangeType<false>)?.(value);
        }
      }
    }
  }, [
    getValueAtIndex,
    getValueOfSelection,
    isMultiselect,
    multiselect,
    onChange,
    prevSelection,
    selection,
  ]);

  // Do any of the options have an icon?
  const withIcons = useMemo(
    () => renderedOptions?.some(child => !!child.props.glyph) ?? false,
    [renderedOptions],
  );

  const renderedChips = useMemo(() => {
    if (multiselect && isArray(selection) && renderedOptions) {
      return selection.map(index => {
        const { value, displayName } = renderedOptions[index].props;
        const onRemove = () => toggleSelection(index);
        return (
          <Chip
            key={value}
            value={value}
            displayName={displayName}
            onRemove={onRemove}
          />
        );
      });
    }
  }, [multiselect, renderedOptions, selection, toggleSelection]);

  const renderedInputIcons = useMemo(() => {
    if (state === 'error') {
      return (
        <Icon glyph="Warning" color={uiColors.red.base} className={endIcon} />
      );
    } else {
      return (
        <>
          {clearable && (
            <IconButton
              ref={clearButtonRef}
              onClick={clearSelection}
              aria-label="Clear selection"
              onFocus={handleClearButtonFocus}
            >
              <Icon glyph="XWithCircle" />
            </IconButton>
          )}
          <Icon glyph="CaretDown" className={endIcon} />
        </>
      );
    }
  }, [clearSelection, state, clearable]);

  /**
   * Menu management
   */
  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [menuWidth, setMenuWidth] = useState(0);
  useEffect(() => {
    setMenuWidth(comboboxRef.current?.clientWidth ?? 0);
  }, [comboboxRef, isOpen, focusedOption, selection]);
  const handleTransitionEnd = () => {
    setMenuWidth(comboboxRef.current?.clientWidth ?? 0);
  };

  const renderedMenuContents = useMemo((): JSX.Element => {
    switch (searchState) {
      case 'loading': {
        return (
          <span className={menuMessage}>
            <Icon
              glyph="Refresh"
              color={uiColors.blue.base}
              className={css`
                animation: rotate 1.5s linear infinite;
                @keyframes rotate {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}
            />
            {searchLoadingMessage}
          </span>
        );
      }

      case 'error': {
        return (
          <span className={menuMessage}>
            <Icon glyph="Warning" color={uiColors.red.base} />
            {searchErrorMessage}
          </span>
        );
      }

      case 'unset':
      default: {
        if (renderedOptions) {
          return <ul className={menuList}>{renderedOptions}</ul>;
        }

        return <span className={menuMessage}>{searchEmptyMessage}</span>;
      }
    }
  }, [
    renderedOptions,
    searchEmptyMessage,
    searchErrorMessage,
    searchLoadingMessage,
    searchState,
  ]);

  /**
   * Focus Management
   */
  type Direction = 'next' | 'prev' | 'first' | 'last';
  const updateFocusedOption = (direction: Direction) => {
    const optionsCount = renderedOptions?.length ?? 0;
    const lastIndex = optionsCount - 1 > 0 ? optionsCount - 1 : 0;

    switch (direction) {
      case 'next': {
        if (!isNull(focusedOption) && focusedOption + 1 < optionsCount) {
          setFocusedOption(focusedOption + 1);
        } else {
          setFocusedOption(0);
        }
        break;
      }

      case 'prev': {
        if (!isNull(focusedOption) && focusedOption - 1 >= 0) {
          setFocusedOption(focusedOption - 1);
        } else {
          setFocusedOption(lastIndex);
        }
        break;
      }

      case 'last': {
        setFocusedOption(lastIndex);
        break;
      }

      case 'first':
      default: {
        setFocusedOption(0);
      }
    }
  };

  // Fired when the wrapper gains focus
  const handleInputFocus = () => {
    scrollToEnd();
    openMenu();
  };

  // Fired onChange
  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // fire any filter function passed in
    onFilter?.(value);
  };

  const handleClearButtonFocus = () => {
    setFocusedOption(null);
  };

  // Global backdrop click handler
  const handleBackdropClick = ({ target }: MouseEvent) => {
    const isChildFocused =
      menuRef.current?.contains(target as Node) ||
      comboboxRef.current?.contains(target as Node) ||
      false;
    setOpen(isChildFocused);
  };
  useEventListener('mousedown', handleBackdropClick);

  // Global keypress handler
  const handleKeyDown = (event: KeyboardEvent) => {
    // No support for modifiers yet
    if (event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Tab':
      case 'Escape': {
        closeMenu();
        updateFocusedOption('first');
        break;
      }

      case 'Enter':
      case 'Space': {
        if (isOpen) {
          event.preventDefault();
        }

        if (
          document.activeElement === inputRef.current &&
          !isNull(focusedOption)
        ) {
          toggleSelection(focusedOption);
        } else if (document.activeElement === clearButtonRef.current) {
          clearSelection();
          setInputFocus();
        }
        break;
      }

      case 'ArrowDown': {
        if (isOpen) {
          // Prevent the page from scrolling
          event.preventDefault();
        }

        updateFocusedOption('next');
        break;
      }

      case 'ArrowUp': {
        if (isOpen) {
          // Prevent the page from scrolling
          event.preventDefault();
        }
        updateFocusedOption('prev');
        break;
      }
    }
  };
  useEventListener('keydown', handleKeyDown);

  const placeholderValue =
    multiselect && isArray(selection) && selection.length > 0
      ? undefined
      : placeholder;

  return (
    <ComboboxContext.Provider
      value={{
        multiselect,
        darkMode,
        size,
        withIcons,
      }}
    >
      <div
        className={cx(
          comboboxParentStyle({ darkMode, size, overflow }),
          className,
        )}
        {...rest}
      >
        <div>
          {label && (
            <Label id={labelId} htmlFor={inputId}>
              {label}
            </Label>
          )}
          {description && <Description>{description}</Description>}
          {/* TODO - add error state message */}
        </div>

        <InteractionRing
          className={interactionRingStyle}
          disabled={disabled}
          color={interactionRingColor({ state, darkMode })}
        >
          {/* Disable eslint: onClick sets focus. Key events would already have focus */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            ref={comboboxRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-owns={menuId}
            tabIndex={-1}
            className={comboboxStyle}
            onClick={setInputFocus}
            onFocus={handleInputFocus}
            onTransitionEnd={handleTransitionEnd}
            data-disabled={disabled}
            data-state={state}
            data-multiselect={multiselect}
            // Add/remove this attribute to force the menu to rerender
            data-is-open={hasMenuBeenOpened || undefined}
          >
            <div
              ref={inputWrapperRef}
              className={inputWrapperStyle({ overflow, isOpen, selection })}
            >
              {renderedChips}
              <input
                aria-label={ariaLabel ?? label}
                aria-autocomplete="list"
                aria-controls={menuId}
                aria-labelledby={labelId}
                ref={inputRef}
                id={inputId}
                className={inputElementStyle}
                placeholder={placeholderValue}
                disabled={disabled ?? undefined}
                onChange={handleInputChange}
              />
            </div>
            {renderedInputIcons}
          </div>
        </InteractionRing>

        {state === 'error' && errorMessage && (
          <div className={errorMessageStyle}>{errorMessage}</div>
        )}

        {/**
         * Menu
         */}
        <Popover
          active={isOpen && !disabled}
          spacing={4}
          align="bottom"
          justify="start"
          refEl={comboboxRef}
          adjustOnMutation={true}
          className={menuWrapperStyle({ darkMode, size, width: menuWidth })}
        >
          <div
            role="listbox"
            aria-labelledby={labelId}
            aria-expanded={isOpen}
            id={menuId}
            ref={menuRef}
            className={menuStyle}
          >
            {renderedMenuContents}
          </div>
        </Popover>
      </div>
    </ComboboxContext.Provider>
  );
}
