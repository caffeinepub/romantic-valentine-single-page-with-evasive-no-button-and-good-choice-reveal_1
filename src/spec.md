# Specification

## Summary
**Goal:** Ensure the final reveal in `OneMoreThingInteraction` displays the user-uploaded photo instead of any random/placeholder image.

**Planned changes:**
- Add/copy the user-provided image into `frontend/public/assets/generated/` under a clean, stable filename.
- Update `frontend/src/components/OneMoreThingInteraction.tsx` to reference the exact `/assets/generated/...` URL for the final (step >= 3) surprise image.
- Keep the existing final-reveal styling (contained sizing/max height and rounded corners) while ensuring no broken links (no 404).

**User-visible outcome:** After the third click, the final surprise view reliably shows the user’s uploaded photo (not a random image), with correct sizing and styling.
