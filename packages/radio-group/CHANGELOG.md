# @leafygreen-ui/radio-group

## 4.0.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 4.0.0

### Major Changes

- ea20761: Implements redesign for RadioGroup component, which includes changes to the DOM structure

### Patch Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0

## 3.0.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 3.0.0

### Major Changes

- 823b057: Radio components no longer add className to both label and input element. Instead, the className is only applied to the label element.

## 2.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/theme@2.0.0

## 1.3.4

### Patch Changes

- 7a4e32e: Updates label text adjacent to a disabled Checkbox, such that the cursor changes to 'not-allowed'
- ef114e6: Adds group role to RadioGroup container div and supplied aria-label to ensure component is accessible
