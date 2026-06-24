**Plan**

1. Update only the `/v2` page spine behavior.
2. Change the side line from repeatedly recalculating and rewriting `top`/`height` on every scroll to a stable bounded track:
   - calculate the nav-bottom start and footer-top end only on mount/load/resize/content changes;
   - store those bounds;
   - on scroll, update only the fill progress.
3. Remove the CSS `height` transition on `.v2-spine-fill` so the fill tracks scroll directly without lag/flicker.
4. Keep the line hidden on mobile as it is now, and keep it ending before the footer.
5. Verify `/v2` visually with Playwright scrolling to confirm the line no longer jumps and does not overlap the footer.