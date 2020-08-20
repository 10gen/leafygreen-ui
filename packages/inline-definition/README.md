# Inline Definition

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/inline-definition--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/inline-definition
```

### NPM

```shell
npm install @leafygreen-ui/inline-definition
```

## Example

```jsx
<H2>
  <InlineDefinition definition={shardDefinition}>Shard</InlineDefinition> your
  cluster
</H2>
```

**Output HTML**

```html
<h2 class="leafygreen-ui-1xwhtk1">
  <span class="leafygreen-ui-1eprrtj" aria-describedby="tooltip-1">Shard</span>
  your cluster
</h2>
<div>
  <div class="leafygreen-ui-10b9mvh">
    <div role="tooltip" id="tooltip-27" class="leafygreen-ui-10d84ei">
      <div class="leafygreen-ui-qlb2bl">
        <div class="leafygreen-ui-3uslxw"></div>
      </div>
      <p class="leafygreen-ui-1s8990i">
        Sharding is a method for horizontally scaling across multiple replica
        sets by breaking up large datasets (e.g. partitioning) into smaller
        parts. Sharding is native to MongoDB.
      </p>
    </div>
  </div>
</div>
```

## Properties

| Prop         | Type                  | Description                                                  | Default |
| ------------ | --------------------- | ------------------------------------------------------------ | ------- |
| `definition` | **Required** `string` | Content that describes the term. Will appear inside Tooltip. |         |
| `children`   | `string`              | Text that will appear underlined                             |         |

_Any other properties will be spread on the `Tooltip` element_
