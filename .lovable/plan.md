## Plan

1. Update only the `/v2` spine behavior.
2. Change the fill calculation so it mirrors the page scrollbar progress:
   - `progress = scrollY / (documentHeight - viewportHeight)`
   - clamp from `0` to `1`
   - apply that percentage directly to `.v2-spine-fill`.
3. Keep the spine track visually bounded from below the nav to above the footer, but do not use the viewport center or section position to calculate progress.
4. Recompute only the track geometry on resize/load/layout changes; on scroll, update only fill height.
5. Verify `/v2` with Playwright by scrolling to top, middle, near footer, and bottom to confirm the fill follows the scrollbar smoothly and the line still does not overlap the footer.