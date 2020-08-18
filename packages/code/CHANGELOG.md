# @leafygreen-ui/code

## 4.0.2

### Patch Changes

- Updated dependencies [ab4c074]
  - @leafygreen-ui/icon-button@7.0.0

## 4.0.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/icon-button@6.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/syntax@3.0.1

## 4.0.0

### Major Changes

- 7373e7b: Updates Syntax component to use the Highlight.js plugin API to render syntax.

  This helps in a couple ways:

  - Lets us remove the only instance of `dangerouslySetInnerHTML` within LeafyGreen UI by rendering syntax highlighting through React directly.
  - Allows us to render the component's content as a Table. This allows us to fix an alignment issue between line numbers and wrapped text, as well as opens the door for future features.

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
- Updated dependencies [7373e7b]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/syntax@3.0.0
  - @leafygreen-ui/icon-button@6.1.2

## 3.5.0

### Minor Changes

- 6233a34: Adds `onCopy` callback, invoked when copy button is clicked

## 3.4.6

### Patch Changes

- Updated dependencies [1d86d56]
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0
  - @leafygreen-ui/icon-button@6.0.0

## 3.4.5

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0
  - @leafygreen-ui/icon-button@5.0.4

## 3.4.4

### Patch Changes

- cf6167e: Build and consume individual glyph components
- Updated dependencies [2fc4ef9]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0
  - @leafygreen-ui/icon-button@5.0.3

## 3.4.3

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
- Updated dependencies [9c34e9f]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/syntax@2.6.0
  - @leafygreen-ui/icon-button@5.0.1

## 3.4.2

### Patch Changes

- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon-button@5.0.0
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 3.4.1

### Patch Changes

- Updated dependencies [4c268a5]
  - @leafygreen-ui/icon@5.0.0
  - @leafygreen-ui/icon-button@4.1.5

## 3.4.0

### Minor Changes

- beccf70: Adds Objective-C language highlight support

### Patch Changes

- Updated dependencies [e1568c6]
- Updated dependencies [beccf70]
  - @leafygreen-ui/icon@4.3.0
  - @leafygreen-ui/syntax@2.5.0
  - @leafygreen-ui/icon-button@4.1.4

## 3.3.0

### Minor Changes

- f2fed7c: Adds copy functionality to Code component

### Patch Changes

- Updated dependencies [f2fed7c]
  - @leafygreen-ui/syntax@2.4.0

## 3.2.0

### Minor Changes

- c117a62: Enables Kotlin language support

### Patch Changes

- Updated dependencies [c117a62]
  - @leafygreen-ui/syntax@2.3.0

## 3.1.0

### Minor Changes

- a0d0d7b: Enables Swift language support

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/syntax@2.0.0
