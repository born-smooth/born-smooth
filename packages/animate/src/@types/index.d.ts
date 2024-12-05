import { CSSProperties } from 'react';

declare global {
  type Ease = 'Blynn Wyvill' | string;

  interface BornSmoothAnimationProperty {
    /**
     * @description The opacity of the element(combination of opacity + visibility)
     */
    autoAlpha?: number;
  }

  type BornSmoothAnimateParser = {
    [K in keyof BornSmoothAnimationProperty]: (
      startValue: NonNullable<BornSmoothAnimationProperty[K]>,
      endValue: NonNullable<BornSmoothAnimationProperty[K]>
    ) => NonNullable<BornSmoothAnimationProperty[K]>;
  };

  interface BornSmoothAnimation extends BornSmoothAnimationProperty {
    duration: string | number;
    ease: Ease;
  }

  type BornSmoothAnimationSpec = BornSmoothAnimation;
  interface BornSmoothAnimationOption {
    in: BornSmoothAnimationSpec;
    out: BornSmoothAnimationSpec;
    initial?: CSSProperties;
  }
}
