# Platform Size Specifications

## Preset Platform Sizes

| Platform | Size Class | Dimensions (px) | Ratio | Use |
|----------|-----------|----------------|-------|-----|
| WeChat Official Account | `.poster.wide` | 2100 × 900 | 21:9 | Article header cover |
| WeChat Share Card | `.poster.square` | 1080 × 1080 | 1:1 | Forward card thumbnail |
| Xiaohongshu/Rednote | `.poster.xhs` | 1080 × 1440 | 3:4 | Note cover image |
| Xiaohongshu Carousel | `.poster.square` | 1080 × 1080 | 1:1 | Multi-image carousel |
| Twitter/X | `.poster.wide` | 1600 × 900 | 16:9 | Tweet card |
| YouTube | `.poster.wide` | 2560 × 1440 | 16:9 | Video thumbnail |
| LinkedIn | `.poster.wide` | 1584 × 396 | 4:1 | Profile banner |
| Instagram Post | `.poster.square` | 1080 × 1080 | 1:1 | Feed post |
| Instagram Story | `.poster.xhs` | 1080 × 1920 | 9:16 | Story/reel |
| Custom | `.poster.custom` | User-defined | Any | Any |

## Custom Size

Users can specify any ratio or dimensions:

- "做成 16:9" → `.poster.custom` with `--canvas-w: 1600; --canvas-h: 900;`
- "800x600" → `.poster.custom` with `--canvas-w: 800; --canvas-h: 600;`
- "竖图" → `.poster.xhs` (default 3:4)
- "横图" → `.poster.wide` (default 21:9)
- "方形" → `.poster.square` (1:1)

## Size-to-Template Mapping

| Visual System | Template | Available Sizes |
|---------------|----------|----------------|
| Editorial | `assets/templates/editorial.html` | xhs, square, wide, custom |
| Swiss | `assets/templates/swiss.html` | xhs, square, wide, custom |
| Portrait | `assets/templates/portrait.html` | xhs, square, wide, custom |

## Rendering Notes

- Playwright renders at the exact pixel dimensions of the `.poster` element
- Use `--scale 2` for retina-quality PNG output
- Minimum canvas size: 400 × 400 px
- Maximum canvas size: 4096 × 4096 px
- For `.poster.custom`, always set `--canvas-w` and `--canvas-h` in the HTML's `:root`

## File Naming Convention

Output files follow this pattern:

```
{platform}-{style}-{layout}-{timestamp}.png
```

Examples:
- `wechat-editorial-m01-20260614.png`
- `xhs-swiss-s01-20260614.png`
- `custom-portrait-p01-20260614.png`
