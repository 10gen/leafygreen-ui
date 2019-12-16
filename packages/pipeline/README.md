# Pipeline

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/pipeline.svg)

## Usage

```shell
npm install @leafygreen-ui/pipeline
```

### Example

```js
<Pipeline size="xsmall" variant="default" className="my-pipeline">
  <Stage>$match</Stage>
  <Stage>$addFields</Stage>
  <Stage>$limit</Stage>
</Pipeline>
```

### Output HTML

```html
<div data-leafygreen-ui="pipeline" class="leafygreen-ui-1hmty9x my-pipeline">
  <ol data-leafygreen-ui="pipeline-stages" class="leafygreen-ui-7mx6fb">
    <li
      data-leafygreen-ui="pipeline-stage"
      class="leafygreen-ui-11gdvjk"
      data-stage-visible="true"
    >
      $match
      <div
        data-leafygreen-ui="pipeline-stage-chevron"
        class="leafygreen-ui-pglvth"
      />
    </li>
    <li
      data-leafygreen-ui="pipeline-stage"
      class="leafygreen-ui-11gdvjk leafygreen-ui-pipeline-stage--last-visible"
      data-stage-visible="true"
    >
      $addFields
      <div
        data-leafygreen-ui="pipeline-stage-chevron"
        class="leafygreen-ui-pglvth"
      />
    </li>
    <li
      data-leafygreen-ui="pipeline-stage"
      class="leafygreen-ui-11gdvjk"
      data-stage-visible="false"
    >
      $limit
      <div
        data-leafygreen-ui="pipeline-stage-chevron"
        class="leafygreen-ui-pglvth"
      />
    </li>
  </ol>
  <div data-leafygreen-ui="pipeline-counter" class="leafygreen-ui-1iicq0p">
    <div
      data-leafygreen-ui="pipeline-counter-chevron"
      class="leafygreen-ui-18yu2oo"
    />
  </div>
</div>
```

## Properties

### Pipeline

| Prop        | Type     | Description                                                                                                                                                                                                | Default     |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `className` | `String` | Adds a className to the class attribute.                                                                                                                                                                   | `''`        |
| `children`  | `Node`   | The content that will render inside of the component. If any nodes other than `Stage` components are passed in as children, the `Pipeline` component will automatically wrap them with `Stage` components. | `undefined` |
| `size`      | `String` | Sets the size variant of the Pipeline. Valid sizes are: `'xsmall'`, `'small'`, `'normal'`, and `'large'`                                                                                                   | `'xsmall'`  |
| `variant`   | `String` | Sets the style variant of the Pipeline. Valid variants are: `'default'`                                                                                                                                    | `'default'` |

_All other props will be spread onto the root element._

### Stage

| Prop               | Type      | Description                                                                                                                                                       | Default     |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `className`        | `String`  | Adds a className to the class attribute.                                                                                                                          | `''`        |
| `children`         | `Node`    | The content that will render inside of the component.                                                                                                             | `undefined` |
| `intersectionNode` | `Element` | The DOM element to observe intersections with. When used with the `Pipeline` component, this prop is automatically set to the element rendered by the `Pipeline`. | `window`    |
| `threshold`        | `Number`  | Either a single number or an array of numbers which indicate at what percentage of the target's visibility, the observer's callback should be executed.           | `0.8`       |

_All other props will be spread onto the root element. The Pipeline component will also decorate the child Stage components with the `size` and `variant` props that it is supplied with._
