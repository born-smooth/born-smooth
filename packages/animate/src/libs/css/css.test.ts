import { css } from './css';
import { styleCache } from './css';

describe('@born-smooth/animate css', () => {
  let styleSheet: HTMLStyleElement;

  beforeEach(() => {
    document.querySelectorAll('#dynamic-styles').forEach((el) => el.remove());
    styleCache.clear();
  });

  it('should be defined', () => {
    expect(css).toBeDefined();
  });

  it('should convert basic CSS properties to kebab case', () => {
    const className = css({ backgroundColor: 'red' });

    expect(className).toBe('sl-123456');
    styleSheet = document.getElementById('dynamic-styles') as HTMLStyleElement;
    expect(styleSheet.sheet?.cssRules[0].cssText).toBe('.sl-123456 {background-color: red;}');
  });

  it('should handle vendor prefixes correctly', () => {
    const className = css({ WebkitTransform: 'scale(2)', MozTabSize: 2 });

    styleSheet = document.getElementById('dynamic-styles') as HTMLStyleElement;
    expect(styleSheet.sheet?.cssRules[0].cssText).toBe('.sl-123456 {-webkit-transform: scale(2); -moz-tab-size: 2;}');
  });

  it('should cache and reuse className for identical styles', () => {
    const style = { color: 'blue', fontSize: '16px' };
    const className1 = css(style);
    const className2 = css(style);

    expect(className1).toBe(className2);
  });

  it('should handle multiple properties', () => {
    const className = css({
      color: 'red',
      fontSize: '20px',
      marginTop: '10px',
    });

    styleSheet = document.getElementById('dynamic-styles') as HTMLStyleElement;
    const rule = styleSheet.sheet?.cssRules[0].cssText;

    expect(rule).toContain('color: red;');
    expect(rule).toContain('font-size: 20px;');
    expect(rule).toContain('margin-top: 10px;');
  });

  it('should handle numeric values', () => {
    const className = css({ width: 100 });

    styleSheet = document.getElementById('dynamic-styles') as HTMLStyleElement;
    expect(styleSheet.sheet?.cssRules[0].cssText).toBe('.sl-123456 {width: 100;}');
  });
});
