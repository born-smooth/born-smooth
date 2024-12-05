import React from 'react';
import { smoothLayout } from './smooth-layout';
import { render } from '@testing-library/react';

describe('smoothLayout', () => {
  it('should be defined', () => {
    expect(smoothLayout).toBeDefined();
  });

  describe('Target element', () => {
    it('should handle React elements correctly', () => {
      const testCases = [
        { element: <div>Sample div</div>, expectedTag: 'div' },
        { element: <span className="test">Span with class</span>, expectedTag: 'span' },
        { element: <>Fragment with children</>, expectedTag: undefined },
      ];

      testCases.forEach(({ element, expectedTag }) => {
        const Result = smoothLayout(element)({});
        expect(React.isValidElement(<Result />)).toBeTruthy();

        const { container } = render(<Result />);

        const renderedElement = container.firstElementChild;
        expect(renderedElement?.tagName.toLowerCase()).toBe(expectedTag);
      });
    });

    it('should handle DOM elements correctly', () => {
      const testCases = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

      testCases.forEach((element) => {
        const Result = smoothLayout(element)({});
        expect(React.isValidElement(<Result />)).toBeTruthy();
        const { container } = render(<Result />);
        expect(container.firstElementChild?.tagName.toLowerCase()).toBe(element);
      });
    });
  });

  describe('Styling target element', () => {
    it('should be applied css property correctly', () => {
      const element = <div>Test content</div>;
      const Result = smoothLayout(element)({
        color: 'red',
        backgroundColor: '#000',
      });
      expect(React.isValidElement(<Result />)).toBeTruthy();

      const { container } = render(<Result />);
      const renderedElement = container.firstElementChild;
      expect(renderedElement?.className).toMatch(/^sl-[a-zA-Z0-9]{6}$/);

      const computedStyle = window.getComputedStyle(renderedElement as Element);
      expect(computedStyle.color).toBe('red');
      expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 0)');
    });

    it('should accept additional props', () => {
      const Result = smoothLayout('div')<{ color: string }>((props) => ({
        color: props.color,
      }));

      const { container } = render(<Result color="blue" />);
      const renderedElement = container.firstElementChild;
      expect(renderedElement?.className).toMatch(/^sl-[a-zA-Z0-9]{6}$/);

      const computedStyle = window.getComputedStyle(renderedElement as Element);
      expect(computedStyle.color).toBe('blue');
    });
  });
});
