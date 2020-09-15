const Size = {
  Small: 'small',
  Default: 'default',
} as const;

type Size = typeof Size[keyof typeof Size];

export { Size };
