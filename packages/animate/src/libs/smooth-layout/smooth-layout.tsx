import React, { JSX, CSSProperties } from 'react';
import { css } from '../css';

type SmoothLayoutComponent<T> = (props: T) => JSX.Element;
type SmoothLayoutFactory = <T extends object>(
  factoryProps: CSSProperties | ((p: T) => CSSProperties)
) => SmoothLayoutComponent<T>;

function smoothLayout(target: keyof HTMLElementTagNameMap): SmoothLayoutFactory;
function smoothLayout(target: React.ReactNode): SmoothLayoutFactory;

function smoothLayout(target: React.ReactNode | keyof HTMLElementTagNameMap): SmoothLayoutFactory {
  return function smoothLayoutFactory<T extends object>(factoryProps: CSSProperties | ((p: T) => CSSProperties)) {
    return function SmoothLayoutComponent(props: T) {
      const styleProps = typeof factoryProps === 'function' ? factoryProps(props) : factoryProps;

      const element =
        typeof target === 'string'
          ? React.createElement(target as keyof HTMLElementTagNameMap, { className: css(styleProps), ...props })
          : React.cloneElement(target as React.ReactElement, { className: css(styleProps), ...props });

      return element;
    };
  };
}

export { smoothLayout };
