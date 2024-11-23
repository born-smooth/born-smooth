import React from 'react';

const smoothLayout = (target: React.ReactNode | keyof HTMLElementTagNameMap) => {
  const element = target === 'string' ? React.createElement(target as keyof HTMLElementTagNameMap) : target;

  return element;
};

export { smoothLayout };
