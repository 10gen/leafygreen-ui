# @leafygreen-ui/popover

## 5.2.0

### Minor Changes

- 4a27db7: Popover now accepts an onClick prop

### Patch Changes

- Updated dependencies [2c09c48]
- Updated dependencies [add8745]
  - @leafygreen-ui/hooks@4.1.0

## 5.1.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2
  - @leafygreen-ui/portal@2.2.1

## 5.1.3

### Patch Changes

- Updated dependencies [fa55b3d]
- Updated dependencies [95b4949]
  - @leafygreen-ui/hooks@4.0.0
  - @leafygreen-ui/portal@2.2.0

## 5.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/hooks@3.0.0
  - @leafygreen-ui/portal@2.1.3

## 5.1.1

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.
- 083eec3: Remove usage of `Element` in Node target builds that was preventing rendering the component in SSR contexts.
- Updated dependencies [083eec3]
  - @leafygreen-ui/portal@2.1.2
  - @leafygreen-ui/lib@4.5.1

## 5.1.0

### Minor Changes

- 06fbf05: Popover allows setting a `portalClassName` prop

## 5.0.2

### Patch Changes

- 05779a1: Upgrades `react-transition-group` to 4.4.1 which removes all React `StrictMode` warnings, making these components `StrictMode` safe.

## 5.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 5.0.0

### Major Changes

- 2176b77: Refactors Popover to only use element positions relative to the viewport for calculating viewport collisions, and use element positions relative to the document for calculating the element positioning itself.

## 4.0.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
  - @leafygreen-ui/palette@2.0.1

## 4.0.0

### Major Changes

- bc47b13: Added Justify.Fit to tooltip/popover, and Align.CenterHorizontal and Align.CenterVertical to popover

  For direct consumers of <Popover>, the function-as-a-child pattern now passes `align` and `justify` params,
  and the `justification` param/enum has been removed. This should be the only breaking change in this release.

### Patch Changes

- Updated dependencies [1b298cc]
  - @leafygreen-ui/hooks@2.1.0

## 3.0.2

### Patch Changes

- 232cf52: `React-transition-group` now dependency instead of peer dependency
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 69792b8: Make `react-transition-group` an external dependency of the build
- Updated dependencies [11b2217]
  - @leafygreen-ui/lib@4.1.0

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/portal@2.0.0
  - @leafygreen-ui/theme@2.0.0

## 2.0.0

### Major Changes

- f6b6b7a: Children of Popover are no longer rendered to the DOM when the Popover is closed

### Patch Changes

- Updated dependencies [9c45cb4]
- Updated dependencies [319fb82]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/portal@1.1.8

## 1.2.0

### Minor Changes

- 12fb220: Accepts children as a function, with signature `({alignment, justification, referenceElementPosition }) => {}` or `React.Element`

- Updated dependencies [563dc2e]:
  - @leafygreen-ui/portal@1.1.7
