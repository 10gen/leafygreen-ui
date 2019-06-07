declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.gif' {
  const value: string;
  export = value;
}

declare namespace SVGR {
  // See .svgrrc.js for how this component gets generated
  interface ComponentProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    size?: number;
    title?: string;
  }
  type Component = React.ComponentType<ComponentProps>;
}

declare module '*.svg' {
  const value: SVGR.Component;
  export = value;
}
