export type Bezier = [number, number, number, number];

export const EASE_CURTAIN: Bezier = [0.76, 0, 0.24, 1];
export const EASE_OUT_EXPO: Bezier = [0.16, 1, 0.3, 1];

/** Shared scroll-trigger config for all entrance animations. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;