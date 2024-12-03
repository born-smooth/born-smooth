import React, { JSX, CSSProperties, useMemo } from 'react';
import { blynnWyvill } from './pre-defined-layout-animation';
import { css } from '../css';

type SmoothLayoutComponent<T> = (props: T) => JSX.Element;
type SmoothLayoutFactory = <T extends object>(
  factoryProps: CSSProperties | ((p: T) => CSSProperties)
) => SmoothLayoutComponent<T>;

type SmoothLayoutTarget = React.ReactNode | keyof HTMLElementTagNameMap;

function smoothLayout(
  target: keyof HTMLElementTagNameMap,
  animationOption?: BornSmoothAnimationOption
): SmoothLayoutFactory;
function smoothLayout(target: React.ReactNode, animationOption?: BornSmoothAnimationOption): SmoothLayoutFactory;

function smoothLayout(
  target: SmoothLayoutTarget,
  animationOption: BornSmoothAnimationOption = blynnWyvill
): SmoothLayoutFactory {
  return function smoothLayoutFactory<T extends object>(factoryProps: CSSProperties | ((p: T) => CSSProperties)) {
    return function SmoothLayoutComponent(props: T) {
      // animationOption destructuring
      const {
        in: { duration: inDuration, ease: inEase, ...inAnimation },
        out: { duration: outDuration, ease: outEase, ...outAnimation },
        initial,
      } = animationOption;
      // props destructuring
      // calculated values
      const initialStyle = initial || {
        opacity: 0,
        visibility: 'hidden',
      };
      const styleProps = useMemo(
        () =>
          typeof factoryProps === 'function'
            ? { ...factoryProps(props), ...initialStyle }
            : { ...factoryProps, ...initialStyle },
        [props]
      );
      // TODO: parse animation

      // render
      const element = useMemo(
        () =>
          typeof target === 'string'
            ? React.createElement(target as keyof HTMLElementTagNameMap, { className: css(styleProps), ...props })
            : React.cloneElement(target as React.ReactElement, { className: css(styleProps), ...props }),
        [props, styleProps]
      );

      return element;
    };
  };
}

export * from './pre-defined-layout-animation';
export { smoothLayout };
