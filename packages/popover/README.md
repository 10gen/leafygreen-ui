# Popover

## Example

```js
import Popover from '@leafygreen-ui/popover';

<button
  className={containerStyle}
  onClick={() => this.setState({ active: !this.state.active })}
>
  Popover
  <Popover
    align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
    justify={select('justify', ['start', 'middle', 'end'], 'start')}
    active={this.state.active}
    usePortal={boolean('usePortal', true)}
    spacing={number('spacing', 10)}
  >
    <div className={popoverStyle}>Popover content</div>
  </Popover>
</button>;
```

## Output HTML

```html
<button class="leafygreen-ui-79elbk">
  Popover
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>

<div align="bottom" justify="start" class="leafygreen-ui-1t5dnko">
  <div class="leafygreen-ui-ii2v5b">Popover content</div>
</div>
```

## Simple Use Case

The popover component will be automatically positioned relative to its nearest parent. If `usePortal` is set to `false`, then it will be positioned relative to its nearest ancestor with the CSS property: `position: absolute | relative | fixed`.

| Prop               | Type                                     | Description                                                                                                                                                                                                              | Default    |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `active`           | `boolean`                                | Determines whether the Popover is active or inactive                                                                                                                                                                     | `false`    |
| `align`            | `'top'`, `'bottom'`, `'left'`, `'right'` | A string that determines the alignment of the popover relative to the `refEl`.                                                                                                                                           | `'bottom'` |
| `justify`          | `'start'`, `'middle'`, `'end'`           | A string that determines the justification of the popover relative to the `refEl`. Justification will be defined relative to the `align` prop                                                                            | `'start'`  |
| `children`         | `node`                                   | Content that will appear inside of the `<Popver />` component                                                                                                                                                            |            |
| `usePortal`        | `boolean`                                | Will position Popover's children relative to its parent without using a Portal, if `usePortal` is set to false. NOTE: The parent element should be CSS position `relative`, `fixed`, or `absolute` if using this option. | `true`     |
| `spacing`          | `number`                                 | Specifies the amount of spacing (in pixels) between the trigger element and the content element.                                                                                                                         | `10`       |
| `className`        | `string`                                 | Classname to apply to popover-content container                                                                                                                                                                          |            |
| `adjustOnMutation` | `boolean`                                | Should the Popover auto adjust its content when the DOM changes (using MutationObserver).                                                                                                                                | `false`    |

## Advanced Use Case

| Prop    | Type     | Description                                                                                                                                                                                         | Default |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `refEl` | `object` | You can supply a `refEl` prop, if you do not want the popover to be positioned relative to it's nearest parent. Ref to the element to which the popover component should be positioned relative to. | `null`  |

_Any other properties will be spread on the popover-content container_
