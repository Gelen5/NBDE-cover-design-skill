# QA Checklist

Run before final delivery. All P0 items must pass. P1 items should pass. P2 items are advisory.

## P0 — Must Pass (blocking)

- [ ] **Contrast ratio**: All text has WCAG 2.0 AA contrast (≥4.5:1 for normal text, ≥3:1 for large text)
- [ ] **No overflow**: No text or element extends beyond the canvas boundary
- [ ] **Canvas dimensions**: Output PNG matches target platform size exactly
- [ ] **Face avoidance** (portrait mode only): Text zone IOU with face box < 0.3
- [ ] **No broken images**: All image URLs load correctly (no 404 or broken src)
- [ ] **Chinese font rendering**: All Chinese text renders with correct font (not fallback)

## P1 — Should Pass

- [ ] **Content density** (3:4 cards): Content covers ≥75% of canvas height
- [ ] **Title length**: Title fits within canvas without excessive shrinking
- [ ] **Overlay opacity** (P03 portrait): Between 0.4 and 0.7
- [ ] **Text readability on images**: When text overlays an image, text-shadow or overlay is present
- [ ] **Font consistency**: No mixed font families within same role (e.g., no serif in Swiss layout)
- [ ] **Accent color usage**: Accent color used sparingly (not >30% of visible area)
- [ ] **No visible instructions**: No keyboard shortcuts, usage text, or "click here" in the image

## P2 — Advisory

- [ ] **Whitespace rhythm**: No pure-white bands >15% of canvas height without stated purpose
- [ ] **Image quality**: Photos not blurry or pixelated at output resolution
- [ ] **Alignment**: Elements aligned to grid (8px or 12px baseline)
- [ ] **Typography scale**: Font sizes follow the template's type scale
- [ ] **Color consistency**: All colors come from theme variables, no hardcoded hex

## Auto-Check Commands

```bash
# Check contrast between two colors
node scripts/color-utils.mjs contrast "#0a0a0b" "#f3f0e8"

# Auto-select text color for a background
node scripts/color-utils.mjs auto-text "#0a0a0a"

# Detect faces and validate avoidance
node scripts/face-detect.mjs <image-path> --output json
```

## Render Validation

After Playwright rendering:

1. Verify output PNG exists and is not empty
2. Check PNG dimensions match expected size (×2 for retina)
3. Visually inspect for obvious rendering errors
4. If portrait cover, re-run face detection on the rendered output to confirm avoidance
