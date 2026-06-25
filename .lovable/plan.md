## Problem
In v2, the spine fill jumps to ~100% almost immediately instead of progressing smoothly with scroll.

The current formula uses the viewport bottom as the reference:
`p = (scrollTop + innerHeight - startY) / (endY - startY)`

Because `startY` is just below the nav (~80px) and `innerHeight` is ~800px, `traveled` starts at ~720px before the user has scrolled at all, so the fill is already most of the way full on first paint and saturates after a tiny scroll.

## Fix
Tie progress to actual scroll travel through the spine band, not to viewport position:

`p = (scrollTop - startY) / ((endY - innerHeight) - startY)`, clamped to [0, 1].

- When `scrollTop` reaches `startY` (nav scrolled out) → `p = 0`, fill starts.
- When `scrollTop` reaches `endY - innerHeight` (footer's top just enters viewport) → `p = 1`, fill complete.
- In between, fill grows linearly with scroll — smooth and proportional.

Guard the denominator (`Math.max(..., 1)`) so very short pages don't divide by zero.

## File
- `src/routes/v2.tsx` — replace the `tick()` formula inside the `Spine` component only. No other changes.