# Portrait Rules — Face Detection & Avoidance

## Overview

When generating portrait covers (Capability 4), face detection and avoidance is mandatory. This document specifies the complete pipeline.

## Pipeline

```
User uploads photo
    │
    ▼
Step 1: Face Detection (MediaPipe)
    │  Output: face bounding boxes [{x, y, w, h, score}, ...]
    │  Coordinates: normalized 0-1 relative to image
    │
    ▼
Step 2: Layout Decision
    │  Based on face positions → choose P01-P06
    │  See layouts-portrait.md for selection logic
    │
    ▼
Step 3: Text Zone Calculation
    │  Calculate safe text zone based on face boxes
    │  Strategy: "side" (separate column) or "overlay" (gradient)
    │
    ▼
Step 4: IOU Validation
    │  Check text zone vs face box IOU < 0.3
    │  If fails → adjust text zone
    │
    ▼
Step 5: CSS Variable Injection
    │  --face-x, --face-y, --face-w, --face-h
    │  --face-left, --face-right, --face-top, --face-bottom
    │  --overlay-opacity
    │
    ▼
Step 6: Render + Contrast Check
    │  Playwright render → auto contrast check
    │  If contrast fails → increase overlay opacity
    │
    ▼
Output PNG
```

## Face Detection

### Tool: MediaPipe Tasks API (JavaScript)

```bash
node scripts/face-detect.mjs <image-path> --output json
```

### Output Format

```json
{
  "faces": [
    { "x": 0.35, "y": 0.15, "w": 0.3, "h": 0.4, "score": 0.95 }
  ],
  "recommendLayout": "P01",
  "textZone": { "x": 0.5, "y": 0, "w": 0.5, "h": 1.0, "strategy": "side" },
  "cssVars": {
    "--face-x": "50%",
    "--face-y": "35%",
    "--face-w": "30%",
    "--face-h": "40%",
    "--overlay-opacity": "0"
  }
}
```

### Fallback Mode

If MediaPipe is not installed, the script falls back to simple analysis:
- Assumes face is at center (50%, 35%)
- Recommends P03 (background portrait) as safest default
- Outputs a warning that detection is not accurate

## Face Avoidance Strategies

### Strategy: Side (P01, P02, P04)

Text and portrait occupy separate non-overlapping regions.

| Face Position | Layout | Text Zone |
|--------------|--------|-----------|
| Face center X < 40% | P01 | Right 55% |
| Face center X > 60% | P02 | Left 55% |
| Face center Y < 35% | P04 | Bottom 60% |

### Strategy: Overlay (P03)

Text is overlaid on the portrait with gradient overlay.

| Face Position | data-face-side | Gradient Direction |
|--------------|---------------|-------------------|
| Face X < 40% | left | Right-to-left gradient |
| Face X > 60% | right | Left-to-right gradient |
| Face X 40-60% | center | All-sides vignette |

Overlay opacity range: 0.4 – 0.7
- Start at 0.55
- If contrast check fails → increase by 0.05
- Maximum: 0.7

### Strategy: Minimal (P05, P06)

Portrait is small enough that text avoidance is automatic.

## Hard Rules

1. **IOU < 0.3**: Text zone and face bounding box must have intersection-over-union < 0.3
2. **Overlay required for P03**: No text-on-image without gradient overlay
3. **Contrast ≥ 4.5:1**: All text must pass WCAG 2.0 AA on the actual background
4. **No face crop**: Eyes and mouth must not be cut off. Minimum face retention: 80%
5. **All faces avoided**: When multiple faces detected, text must avoid ALL of them
6. **Overlay opacity ≤ 0.7**: Maximum overlay to avoid hiding the photo entirely

## Contrast Auto-Fix

If the rendered image fails contrast check:

```
1. Increase overlay opacity by 0.05
2. Re-render
3. Re-check contrast
4. Repeat until pass or opacity = 0.7
5. If still fails at 0.7, switch layout to P01 or P02 (side strategy)
```
