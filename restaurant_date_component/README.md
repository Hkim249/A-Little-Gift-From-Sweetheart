# Restaurant Date Component

Standalone Streamlit component for the restaurant sequence.

## Scene logic
1. The original paired `couple_walk.png` sprite remains a single image, preserving the hand-holding pose throughout the diagonal movement toward the restaurant entrance door.
2. The interior scene places Hoàng Kim on the left chair and the male lead on the right chair. Their seated sprites end at the tabletop edge; they are not placed on top of the table.
3. Exactly one envelope is shown at a time. It is part of Hoàng Kim's `seated_gift.png` pose, then transferred by swapping to the male lead's `seated_receive_gift.png` pose. No extra envelope DOM layer is used.

Keep this folder alongside `app.py` and declare it with `components.declare_component(..., path=str(component_dir))`.
