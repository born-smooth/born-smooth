import React from 'react';
import { smoothLayout } from './smooth-layout';

describe('smoothLayout', () => {
  it('should be defined', () => {
    expect(smoothLayout).toBeDefined();
  });

  it('should handle React elements correctly', () => {
    const testCases = [
      <div>Sample div</div>,
      <span className="test">Span with class</span>,
      <>Fragment with children</>,
    ];

    testCases.forEach((element) => {
      const result = smoothLayout(element);
      expect(React.isValidElement(result)).toBeTruthy();
    });
  });

  it.skip('should handle DOM elements correctly', () => {
    const result = smoothLayout('div');
    expect(React.isValidElement(result)).toBeTruthy();
  });
});
