## Plan

1. **Remove the mixed spine control path**
   - Disable the CSS native `animation-timeline` spine mode.
   - Keep one source of truth in JavaScript so the line cannot get stuck with stale compositor animation state when scrolling back up.

2. **Make progress deterministic and reversible**
   - On every animation frame while `/v2` is mounted, read the real page scroll position from `document.scrollingElement.scrollTop`.
   - Compute progress as `scrollTop / (scrollHeight - clientHeight)`.
   - Apply it directly with `transform: scaleY(progress)` so scrolling up and down always maps to the same position.

3. **Keep the line visually bounded**
   - Measure the spine track from just below the sticky nav to the top of the footer.
   - Clamp only the visible track geometry, not the progress math, so it still mirrors the browser scrollbar while never overlapping the footer.

4. **Reduce moving parts that caused bugs**
   - Remove idle timers, native-support branching, and scroll-event-only updates.
   - Re-measure geometry on resize/load and when nav/footer size changes.
   - Use a lightweight continuous `requestAnimationFrame` loop for the spine only on desktop, where the spine is visible.

5. **Verify behavior**
   - Test `/v2` by jumping and fast scrolling down/up at multiple positions.
   - Confirm the fill decreases immediately when scrolling upward and reaches the correct top/middle/bottom states without footer overlap.