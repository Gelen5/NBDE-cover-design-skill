# Portrait Layout Recipes

Six layouts for personalized covers with user photos. All layouts support face avoidance via MediaPipe detection.

## P01: Left Portrait (左侧人像)

**Structure**: Portrait on left 40% + Text on right 60%

**When to use**: User provides a portrait/selfie, content needs strong text area.

**Face avoidance**: Text section is completely separate from portrait section. No overlap possible.

```html
<section class="poster xhs layout-P01" data-layout="P01">
  <div class="portrait-section" style="background-image: url('photo.jpg')"></div>
  <div class="text-section">
    <p class="kicker">TOPIC</p>
    <h1 class="h-hero">标题文字</h1>
    <p class="lead">副标题或简短描述</p>
  </div>
</section>
```

## P02: Right Portrait (右侧人像)

**Structure**: Portrait on right 40% + Text on left 60%

**When to use**: Same as P01 but text-first reading flow preferred.

**Face avoidance**: Same as P01, text and portrait are separate columns.

```html
<section class="poster xhs layout-P02" data-layout="P02">
  <div class="text-section">
    <p class="kicker">TOPIC</p>
    <h1 class="h-hero">标题文字</h1>
    <p class="lead">副标题或简短描述</p>
  </div>
  <div class="portrait-section" style="background-image: url('photo.jpg')"></div>
</section>
```

## P03: Background Portrait (背景人像)

**Structure**: Portrait fills entire canvas (100%) + Gradient overlay + Text overlaid

**When to use**: Most dramatic layout. User wants the photo to be the hero.

**Face avoidance**: Critical — text must avoid face area. Use `data-face-side` attribute to position text on the opposite side of the face.

**Overlay rules**:
- Overlay opacity: 0.4–0.7 (adjustable via `--overlay-opacity`)
- Text must be white or light-colored with text-shadow
- Gradient direction follows face position

```html
<section class="poster xhs layout-P03" data-layout="P03" data-face-side="left">
  <div class="portrait-section" style="background-image: url('photo.jpg')"></div>
  <div class="overlay"></div>
  <div class="text-section">
    <h1 class="h-hero on-image">标题文字</h1>
    <p class="lead on-image">副标题</p>
  </div>
</section>
```

**data-face-side values**:
- `"left"` → face is on the left, gradient overlay from right, text on right
- `"right"` → face is on the right, gradient overlay from left, text on left
- `"center"` → face is centered, overlay all sides, text centered with strong shadow

## P04: Top Portrait (顶部人像)

**Structure**: Portrait on top 35% + Text on bottom 65%

**When to use**: User provides a landscape/cropped photo, content is text-heavy.

**Face avoidance**: Portrait section and text section are vertically stacked. No overlap.

```html
<section class="poster xhs layout-P04" data-layout="P04">
  <div class="portrait-section" style="background-image: url('photo.jpg')"></div>
  <div class="text-section">
    <p class="kicker">TOPIC</p>
    <h1 class="h-xl">标题文字</h1>
    <p class="lead">描述文字</p>
  </div>
</section>
```

## P05: Collage Portrait (人像拼贴)

**Structure**: Multiple small portrait images in a grid + Text in remaining space

**When to use**: User provides multiple photos (team photos, product shots, etc.)

**Grid options** (via `data-collage` attribute):
- `"2"` → 1×2 grid (2 images side by side)
- `"3"` → 1×3 grid (3 images side by side) or L-shape
- `"4"` → 2×2 grid

```html
<section class="poster xhs layout-P05" data-layout="P05" data-collage="4">
  <div class="collage-grid">
    <div class="collage-item" style="background-image: url('photo1.jpg')"></div>
    <div class="collage-item" style="background-image: url('photo2.jpg')"></div>
    <div class="collage-item" style="background-image: url('photo3.jpg')"></div>
    <div class="collage-item" style="background-image: url('photo4.jpg')"></div>
  </div>
  <div class="text-section">
    <h1 class="h-xl">标题文字</h1>
    <p class="lead">描述文字</p>
  </div>
</section>
```

## P06: Minimal Portrait (极简人像)

**Structure**: Small portrait (circle or rounded rect) + Large typography dominant

**When to use**: User wants an elegant, minimal design. Portrait is an accent, not hero.

**Shape options** (via `data-portrait-shape` attribute):
- `"circle"` → Circular portrait
- `"rounded"` → Rounded rectangle portrait

**Position options** (via `data-portrait-position` attribute):
- `"top-left"` → Portrait at top-left corner
- `"top-right"` → Portrait at top-right corner
- `"center"` → Portrait centered above title
- `"bottom-right"` → Portrait at bottom-right

```html
<section class="poster xhs layout-P06" data-layout="P06" 
         data-portrait-shape="circle" data-portrait-position="top-left">
  <div class="minimal-portrait" style="background-image: url('photo.jpg')"></div>
  <div class="text-section">
    <p class="meta">AUTHOR · TOPIC</p>
    <h1 class="h-hero">标题文字</h1>
    <p class="h-sub">副标题</p>
  </div>
</section>
```

---

## Layout Selection Guide (Portrait)

| User's Photo | Content Style | Recommended |
|--------------|--------------|-------------|
| Professional headshot | Formal/business | P01 or P02 |
| Casual selfie | Personal/lifestyle | P06 or P03 |
| Full-body photo | Fashion/outdoor | P03 or P04 |
| Multiple people | Team/event | P05 |
| Photo with scenery | Travel/nature | P04 or P03 |
| Close-up face | Minimal/elegant | P06 |

## Hard Rules

1. **IOU < 0.3**: Text region and face bounding box must have intersection-over-union < 0.3
2. **Overlay required**: P03 (background portrait) MUST have gradient overlay, opacity 0.4–0.7
3. **Contrast check**: Text on images must pass WCAG 2.0 AA (≥4.5:1)
4. **No face crop**: Face must not be cropped at eyes or mouth — minimum face box: 80% of original
5. **Multiple faces**: All detected faces must be avoided, not just the primary one
