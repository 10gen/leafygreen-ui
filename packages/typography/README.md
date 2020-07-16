# Typography

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/typography.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/typography--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/typography
```

### NPM

```shell
npm install @leafygreen-ui/typography
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

# H1

## Example

```jsx
import { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<Subtitle>Subtitle</Subtitle>
<Body weight="medium">Body</Body>
<InlineCode>Code</InlineCode>
<Disclaimer>Disclaimer</Disclaimer>
<Overline>Overline</Overline>
<Link href="http://mongodb.design">MongoDB.design</Link>
```

**Output HTML**

```html
<h1 class="leafygreen-ui-wbskfk">Heading 1</h1>
<h2 class="leafygreen-ui-1t0mh6j">Heading 2</h2>
<h6 class="leafygreen-ui-1dmxpt6">Subtitle</h6>
<p class="leafygreen-ui-wkgw79">Body</p>
<code class="leafygreen-ui-18bk0d8">Code</code>
<small class="leafygreen-ui-1cggyhz">Disclaimer</small>
<div class="leafygreen-ui-vezyzr">Overline</div>
<a
  href="http://mongodb.design"
  target="_blank"
  class="leafygreen-ui-1toaa4e"
  data-leafygreen-ui="anchor-container"
>
  <span>MongoDB.design</span>
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>Open in New Tab</title>
  </svg>
</a>
```

## Properties

All props extend the HTMLElementProps of their root tag, however `<Body />` and `<Overline/>` accept extra props

| Component    | Root    |
| ------------ | ------- |
| `H1`         | `h1`    |
| `H2`         | `h2`    |
| `Subtitle`   | `h6`    |
| `Body`       | `p`     |
| `InlineCode` | `code`  |
| `Disclaimer` | `small` |
| `Overline`   | `p`     |
| `Link`       | `a`     |

## Body

| Prop     | Type                | Description                               | Default   |
| -------- | ------------------- | ----------------------------------------- | --------- |
| `weight` | `regular`, `medium` | font-weight applied to typography element | `regular` |

## Overline

| Prop        | Type                                  | Description                                                                                                                         | Default |
| ----------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `component` | `HTMLElement` or `React.ReactElement` | The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props. | `p`     |

## Link

| Prop              | Type                             | Description                                                                                                                                                                                | Default |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `arrowAppearance` | `'hover' | 'permanent' | 'none'` | Displays a right arrow adjacent to the anchor tag. When set to `permanent` the arrow will always be present. When set to `hover`, the arrow will only appear when hovering over the arrow. | `none`  |

_Note:_ If the current host name is different from the host of the destination URL, we will add provide the "\_blank" value for the `target` prop. When the target is set to open in a new tab, we render an icon as a visual affordance.
