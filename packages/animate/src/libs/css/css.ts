import { nanoid } from 'nanoid';
import { CSSProperties } from 'react';

export const styleCache = new Map<string, string>();

function toKebabCase(str: string): string {
  const vendorPrefixPattern = /^(webkit|moz|ms|o)([A-Z])/;
  const match = str.match(vendorPrefixPattern);

  if (match) {
    const prefix = match[1];
    const remainder = str.substring(prefix.length);
    return `-${prefix}-${remainder.replace(/([A-Z])/g, '$1').toLowerCase()}`;
  }

  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function css(cssProperties: CSSProperties): string {
  const cacheKey = JSON.stringify(cssProperties);

  if (styleCache.has(cacheKey)) {
    return styleCache.get(cacheKey)!;
  }

  const className = `sl-${nanoid(6)}`;

  let styleSheet = document.getElementById('dynamic-styles') as HTMLStyleElement;
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    document.head.appendChild(styleSheet);
  }

  const cssString = Object.entries(cssProperties)
    .map(([key, value]) => {
      const property = toKebabCase(key);
      return `${property}: ${value};`;
    })
    .join(' ');

  styleSheet.sheet?.insertRule(`.${className} { ${cssString} }`, styleSheet.sheet.cssRules.length);
  styleCache.set(cacheKey, className);

  return className;
}
