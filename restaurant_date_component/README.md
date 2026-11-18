# Restaurant Date Component

Standalone Streamlit component for the restaurant date scene.

## Layer order

### Entrance scene (back to front)
1. `scene-bg`: restaurant entrance background
2. `walk-floor`: subtle floor depth tint
3. `character-shadow`: separate ground shadows
4. `walker`: Hoàng Kim and male lead sprites (black pixel outlines preserved/reinforced)
5. `entrance-vignette`: subtle top lighting overlay

### Restaurant interior (back to front)
1. `scene-bg`: restaurant interior
2. `inside-light`: warm ambient light
3. `seated-shadow`: contact shadows
4. `seated`: seated character sprites, aligned to the table edge
5. `letter`: envelope prop, rendered in front of the characters during hand-off
6. `dialogue-panel` and `finish-heart`: visual-novel UI above all scene art

All character PNGs are individual transparent sprites. A crisp one-pixel dark contour is added behind each sprite to preserve the strong black pixel-art linework at game scale.
