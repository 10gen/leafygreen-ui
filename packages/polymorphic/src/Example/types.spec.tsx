/**
 * This test file ensures that all Typescript types behave as intended
 * for components extending Polymorphic/InferredPolymorphic
 *
 * We explicitly list all the examples instead of relying on `describe.each`,
 * since it's unclear whether TS will catch errors
 */
/* eslint-disable jest/no-disabled-tests */

import React from 'react';

import { makeWrapperComponent } from '../utils/Polymorphic.testutils';
import { usePolymorphicRef } from '..';

import {
  AdvancedPolymorphic,
  AdvancedPolymorphicWithRef,
  ExampleInferred,
  ExampleInferredDefaultButton,
  ExamplePolymorphic,
  ExamplePolymorphicWithRef,
} from '.';

describe('Typescript types', () => {
  const { Wrapper } = makeWrapperComponent();
  const divRef = usePolymorphicRef<'div'>(); // React.useRef<HTMLDivElement | null>(null);
  const anchorRef = usePolymorphicRef<'a'>();
  const spanRef = usePolymorphicRef<'span'>();

  test.skip('ExamplePolymorphic', () => {
    <>
      <ExamplePolymorphic />
      <ExamplePolymorphic>some content</ExamplePolymorphic>
      <ExamplePolymorphic as="div" />
      <ExamplePolymorphic as="div" ref={divRef} />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphic as="div" ref={anchorRef} />
      <ExamplePolymorphic as="div" ref={divRef}>
        some content
      </ExamplePolymorphic>
      <ExamplePolymorphic key="some-key" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExamplePolymorphic as="a" />
      <ExamplePolymorphic as="a" href="mongodb.design" />
      <ExamplePolymorphic as="a" href="mongodb.design" ref={anchorRef} />
      <ExamplePolymorphic as="a" href="mongodb.design">
        some content
      </ExamplePolymorphic>

      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExamplePolymorphic as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExamplePolymorphic as="divtarget h_blankmongodb.design" />

      <ExamplePolymorphic as="input" />

      <ExamplePolymorphic as={Wrapper} />
      <ExamplePolymorphic as={Wrapper} ref={spanRef} />
      <ExamplePolymorphic as={Wrapper} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphic as={Wrapper} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on Wrapper */}
      <ExamplePolymorphic as={Wrapper} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on Wrapper */}
      <ExamplePolymorphic as={Wrapper} ref={spanRef} href=".design" />
    </>;
  });

  test.skip('ExamplePolymorphicWithRef', () => {
    <>
      <ExamplePolymorphicWithRef />
      <ExamplePolymorphicWithRef>some content</ExamplePolymorphicWithRef>
      <ExamplePolymorphicWithRef as="div" />
      <ExamplePolymorphicWithRef as="div" ref={divRef} />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphicWithRef as="div" ref={anchorRef} />
      <ExamplePolymorphicWithRef as="div" ref={divRef}>
        some content
      </ExamplePolymorphicWithRef>
      <ExamplePolymorphicWithRef key="some-key" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExamplePolymorphicWithRef as="a" />
      <ExamplePolymorphicWithRef as="a" href="mongodb.design" />
      <ExamplePolymorphicWithRef as="a" href="mongodb.design" ref={anchorRef} />
      <ExamplePolymorphicWithRef as="a" href="mongodb.design">
        some content
      </ExamplePolymorphicWithRef>

      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExamplePolymorphicWithRef as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExamplePolymorphicWithRef target="_blank" />

      <ExamplePolymorphicWithRef as="input" />

      <ExamplePolymorphicWithRef as={Wrapper} />
      <ExamplePolymorphicWithRef as={Wrapper} ref={spanRef} />
      <ExamplePolymorphicWithRef as={Wrapper} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphicWithRef as={Wrapper} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on Wrapper */}
      <ExamplePolymorphicWithRef as={Wrapper} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on Wrapper */}
      <ExamplePolymorphicWithRef as={Wrapper} ref={spanRef} href=".design" />
    </>;
  });

  test.skip('AdvancedPolymorphic', () => {
    <>
      <AdvancedPolymorphic />
      <AdvancedPolymorphic>some content</AdvancedPolymorphic>
      <AdvancedPolymorphic as="div" />
      <AdvancedPolymorphic as="div" ref={divRef} />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphic as="div" ref={anchorRef} />
      <AdvancedPolymorphic as="div" ref={divRef}>
        some content
      </AdvancedPolymorphic>
      <AdvancedPolymorphic key="some-key" />

      {/* @ts-expect-error - Require href when as="a" */}
      <AdvancedPolymorphic as="a" />
      <AdvancedPolymorphic as="a" href="mongodb.design" />
      <AdvancedPolymorphic as="a" href="mongodb.design" ref={anchorRef} />
      <AdvancedPolymorphic as="a" href="mongodb.design">
        some content
      </AdvancedPolymorphic>

      {/* @ts-expect-error href is not allowed on explicit div */}
      <AdvancedPolymorphic as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <AdvancedPolymorphic as="div" targe="_blank" />

      <AdvancedPolymorphic as="input" />

      <AdvancedPolymorphic as={Wrapper} />
      <AdvancedPolymorphic as={Wrapper} ref={spanRef} />
      <AdvancedPolymorphic as={Wrapper} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphic as={Wrapper} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on Wrapper */}
      <AdvancedPolymorphic as={Wrapper} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on Wrapper */}
      <AdvancedPolymorphic as={Wrapper} ref={spanRef} href=".design" />
    </>;
  });

  test.skip('AdvancedPolymorphicWithRef', () => {
    <>
      <AdvancedPolymorphicWithRef />
      <AdvancedPolymorphicWithRef>some content</AdvancedPolymorphicWithRef>
      <AdvancedPolymorphicWithRef as="div" />
      <AdvancedPolymorphicWithRef as="div" ref={divRef} />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphicWithRef as="div" ref={anchorRef} />
      <AdvancedPolymorphicWithRef as="div" ref={divRef}>
        some content
      </AdvancedPolymorphicWithRef>
      <AdvancedPolymorphicWithRef key="some-key" />

      {/* @ts-expect-error - Require href when as="a" */}
      <AdvancedPolymorphicWithRef as="a" />
      <AdvancedPolymorphicWithRef as="a" href="mongodb.design" />
      <AdvancedPolymorphicWithRef
        as="a"
        href="mongodb.design"
        ref={anchorRef}
      />
      <AdvancedPolymorphicWithRef as="a" href="mongodb.design">
        some content
      </AdvancedPolymorphicWithRef>

      {/* @ts-expect-error href is not allowed on explicit div */}
      <AdvancedPolymorphicWithRef as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <AdvancedPolymorphicWithRef as="div" target="_blank" />

      <AdvancedPolymorphicWithRef as="input" />

      <AdvancedPolymorphicWithRef as={Wrapper} />
      <AdvancedPolymorphicWithRef as={Wrapper} ref={spanRef} />
      <AdvancedPolymorphicWithRef as={Wrapper} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphicWithRef as={Wrapper} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on Wrapper */}
      <AdvancedPolymorphicWithRef as={Wrapper} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on Wrapper */}
      <AdvancedPolymorphicWithRef as={Wrapper} ref={spanRef} href=".design" />
    </>;
  });

  const AnchorLikeWrapper = (props: JSX.IntrinsicElements['a']) => {
    return <a {...props}>content</a>;
  };

  test.skip('ExampleInferred', () => {
    <>
      <ExampleInferred />
      <ExampleInferred>some content</ExampleInferred>
      <ExampleInferred as="div" />
      <ExampleInferred as="div" ref={divRef} />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExampleInferred as="div" ref={anchorRef} />
      <ExampleInferred as="div" ref={divRef}>
        some content
      </ExampleInferred>
      <ExampleInferred key="some-key" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExampleInferred as="a" />
      <ExampleInferred href="mongodb.design" />
      <ExampleInferred as="a" href="mongodb.design" />
      <ExampleInferred as="a" href="mongodb.design" ref={anchorRef} />
      <ExampleInferred as="a" href="mongodb.design">
        some content
      </ExampleInferred>

      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExampleInferred as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExampleInferred as="div" target="_blank" />

      <ExampleInferred as="input" />

      <ExampleInferred as={Wrapper} />
      <ExampleInferred as={Wrapper} ref={spanRef} />
      <ExampleInferred as={Wrapper} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExampleInferred as={Wrapper} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on Wrapper */}
      <ExampleInferred as={Wrapper} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on Wrapper */}
      <ExampleInferred as={Wrapper} ref={spanRef} href=".design" />

      <ExampleInferred as={AnchorLikeWrapper} href=".design" />
    </>;
  });

  test.skip('ExampleInferredDefaultButton', () => {
    <>
      <ExampleInferredDefaultButton />
      <ExampleInferredDefaultButton>some content</ExampleInferredDefaultButton>
      <ExampleInferredDefaultButton as="div" />
      <ExampleInferredDefaultButton as="div" ref={divRef} />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExampleInferredDefaultButton as="div" ref={anchorRef} />
      <ExampleInferredDefaultButton as="div" ref={divRef}>
        some content
      </ExampleInferredDefaultButton>
      <ExampleInferredDefaultButton key="some-key" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExampleInferredDefaultButton as="a" />
      <ExampleInferredDefaultButton href="mongodb.design" />
      <ExampleInferredDefaultButton as="a" href="mongodb.design" />
      <ExampleInferredDefaultButton
        as="a"
        href="mongodb.design"
        ref={anchorRef}
      />
      <ExampleInferredDefaultButton as="a" href="mongodb.design">
        some content
      </ExampleInferredDefaultButton>

      {/* @ts-expect-error - type not valid for anchor */}
      <ExampleInferredDefaultButton as="a" type="submit" />
      {/* @ts-expect-error - href not valid when explicitly set to button */}
      <ExampleInferredDefaultButton as="button" href="mongodb.design" />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExampleInferredDefaultButton as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExampleInferredDefaultButton as="div" target="_blank" />

      <ExampleInferredDefaultButton as="input" />

      <ExampleInferredDefaultButton as={Wrapper} />
      <ExampleInferredDefaultButton as={Wrapper} ref={spanRef} />
      <ExampleInferredDefaultButton
        as={Wrapper}
        ref={spanRef}
        darkMode={true}
      />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExampleInferredDefaultButton as={Wrapper} ref={divRef} />
      <ExampleInferredDefaultButton as={Wrapper} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on Wrapper */}
      <ExampleInferredDefaultButton as={Wrapper} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on Wrapper */}
      <ExampleInferredDefaultButton as={Wrapper} href=".design" />

      <ExampleInferredDefaultButton as={AnchorLikeWrapper} href=".design" />
    </>;
  });
});
