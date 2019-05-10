import {
  Align,
  Justification,
  RefPosition,
  ReferencePosition,
  ContentPosition,
} from './Popover';

interface TransformOriginArgs {
  alignment: Align;
  justification: Justification;
}

// Constructs the transform origin for any given pair of alignment / justification
export function getTransformOrigin({
  alignment,
  justification,
}: TransformOriginArgs): string {
  let x = '';
  let y = '';

  switch (alignment) {
    case Align.Left:
      x = 'right';
      break;

    case Align.Right:
      x = 'left';
      break;

    case Align.Bottom:
      y = 'top';
      break;

    case Align.Top:
      y = 'bottom';
      break;
  }

  switch (justification) {
    case Justification.Left:
      x = 'left';
      break;

    case Justification.Right:
      x = 'right';
      break;

    case Justification.Bottom:
      y = 'bottom';
      break;

    case Justification.Top:
      y = 'top';
      break;

    case Justification.CenterHorizontal:
      x = 'center';
      break;

    case Justification.CenterVertical:
      y = 'center';
      break;
  }

  return `${x} ${y}`;
}

// Get transform styles for position object
export function getTransform(
  alignment: Align,
  transformAmount: number,
): string {
  const scaleAmount = 0.8;

  switch (alignment) {
    case Align.Top:
      return `translate3d(0, ${transformAmount}px, 0) scale(${scaleAmount})`;

    case Align.Bottom:
      return `translate3d(0, -${transformAmount}px, 0) scale(${scaleAmount})`;

    case Align.Left:
      return `translate3d(${transformAmount}px, 0, 0) scale(${scaleAmount})`;

    case Align.Right:
      return `translate3d(-${transformAmount}px, 0, 0) scale(${scaleAmount})`;
  }
}

export const defaultElementPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

// Gets top offset, left offset, width and height dimensions for a node
export function getElementPosition(element: HTMLElement | null): RefPosition {
  if (!element) {
    return defaultElementPosition;
  }

  const { top, bottom, left, right } = element.getBoundingClientRect();
  const { offsetHeight: height, offsetWidth: width } = element;

  return { top, bottom, left, right, height, width };
}

interface AbsolutePositionObject {
  top?: string | 0;
  bottom?: string | 0;
  left?: string | 0;
  right?: string | 0;
}

interface CalcRelativePositionArgs {
  alignment: Align;
  justification: Justification;
  referenceElPos: ReferencePosition;
  contentElPos: ContentPosition;
  spacing: number;
}

// Returns positioning for an element absolutely positioned within it's relative parent
export function calcRelativePosition({
  alignment,
  justification,
  referenceElPos,
  contentElPos,
  spacing,
}: CalcRelativePositionArgs): AbsolutePositionObject {
  const positionObject: AbsolutePositionObject = {};

  switch (alignment) {
    case Align.Top:
      positionObject.bottom = `calc(100% + ${spacing}px)`;
      break;

    case Align.Bottom:
      positionObject.top = `calc(100% + ${spacing}px)`;
      break;

    case Align.Left:
      positionObject.right = `calc(100% + ${spacing}px)`;
      break;

    case Align.Right:
      positionObject.left = `calc(100% + ${spacing}px)`;
      break;
  }

  switch (justification) {
    case Justification.Top:
      positionObject.top = 0;
      break;

    case Justification.Bottom:
      positionObject.bottom = 0;
      break;

    case Justification.Left:
      positionObject.left = 0;
      break;

    case Justification.Right:
      positionObject.right = 0;
      break;

    case Justification.CenterHorizontal:
      positionObject.left = `${referenceElPos.width / 2 -
        contentElPos.width / 2}px`;
      break;

    case Justification.CenterVertical:
      positionObject.top = `${referenceElPos.height / 2 -
        contentElPos.height / 2}px`;
      break;
  }

  return positionObject;
}

interface CalculatePositionArgs {
  alignment?: Align;
  justification?: Justification;
  spacing: number;
  referenceElPos: ReferencePosition;
  contentElPos: ContentPosition;
}

// Returns the 'top' position in pixels for a valid alignment or justification.
export function calcTop({
  alignment,
  justification,
  contentElPos,
  referenceElPos,
  spacing,
}: CalculatePositionArgs): number {
  switch (justification) {
    case Justification.Top:
      return referenceElPos.top;

    case Justification.Bottom:
      return referenceElPos.top + referenceElPos.height - contentElPos.height;

    case Justification.CenterVertical:
      return (
        referenceElPos.top + referenceElPos.height / 2 - contentElPos.height / 2
      );
  }

  switch (alignment) {
    case Align.Top:
      return referenceElPos.top - contentElPos.height - spacing;

    case Align.Bottom:
    default:
      return referenceElPos.top + referenceElPos.height + spacing;
  }
}

// Returns the 'left' position in pixels for a valid alignment or justification.
export function calcLeft({
  alignment,
  justification,
  contentElPos,
  referenceElPos,
  spacing,
}: CalculatePositionArgs): number {
  switch (alignment) {
    case Align.Left:
      return referenceElPos.left - contentElPos.width - spacing;

    case Align.Right:
      return referenceElPos.left + referenceElPos.width + spacing;
  }

  switch (justification) {
    case Justification.Right:
      return referenceElPos.left + referenceElPos.width - contentElPos.width;

    case Justification.CenterHorizontal:
      return (
        referenceElPos.left + referenceElPos.width / 2 - contentElPos.width / 2
      );

    case Justification.Left:
    default:
      return referenceElPos.left;
  }
}
