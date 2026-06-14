# NBDE Cover Design Skill

> One skill for cover images, AI image generation, and personalized portrait covers. Supports custom ratios and custom colors.

## Features

### Three Core Capabilities

1. **AI Image Generation** — Generate images from text prompts using multiple providers (DashScope, OpenAI, Google, MiniMax, Jimeng)
2. **Multi-Platform Covers** — Generate covers for WeChat (21:9+1:1), Xiaohongshu (3:4), Twitter/X (16:9), YouTube, and custom sizes
3. **Portrait Covers** — Upload your photo + topic → personalized cover with face avoidance

### Visual Systems

| System | Style | Presets | Switch |
|--------|-------|---------|--------|
| Editorial Magazine | Serif, paper+ink, magazine feel | 6 themes (ink-classic, indigo-porcelain, forest-ink, kraft-paper, dune, midnight-ink) | `data-theme="..."` |
| Swiss International | Inter, strict grid, one accent | 4 accents (IKB Blue, Lemon Yellow, Lemon Green, Safety Orange) | `data-accent="..."` |
| Custom | User-defined | Any color | `data-theme="custom"` or `data-accent="custom"` |

### Layout Recipes

- **Editorial**: 16 layouts (M01-M16) — covers, essays, checklists, timelines, etc.
- **Swiss**: 12 layouts (S01-S12) — KPI towers, bar charts, matrices, CTA banners, etc.
- **Portrait**: 6 layouts (P01-P06) — left/right/background/top/collage/minimal

### Custom Colors & Ratios

Colors and sizes are first-class features, not hidden options:

- "换成蓝色" → instant color change
- "改成 16:9" → instant ratio change
- All changes re-render in < 15 seconds

## Quick Start

### Install

```bash
# Clone this skill
git clone https://github.com/Gelen5/NBDE-cover-design-skill.git

# Install dependencies
cd NBDE-cover-design-skill
npm install playwright
npm install @mediapipe/tasks-vision  # Optional, for portrait face detection
```

### Usage in Claude Code / Codex

Just describe what you want:

```
"帮我生成一张公众号封面，主题是AI工具推荐"
"用这张照片做一个封面"（附图）
"生成一张关于赛博朋克城市的图片"
"做个小红书封面，Swiss风格，蓝色主题"
```

### Environment Variables (for AI Image Generation)

```bash
export DASHSCOPE_API_KEY="your-key"     # 通义万相
export OPENAI_API_KEY="your-key"         # DALL-E
export GOOGLE_API_KEY="your-key"         # Imagen
export MINIMAX_API_KEY="your-key"        # MiniMax
export JIMENG_API_KEY="your-key"         # 即梦
```

### CLI Scripts

```bash
# Render HTML to PNG
node scripts/render.mjs output/index.html output/cover.png --width 2100 --height 900

# Face detection (for portrait covers)
node scripts/face-detect.mjs photo.jpg --output json

# AI image generation
node scripts/image-gen.mjs --prompt "cyberpunk city at night" --provider dashscope --count 4

# Color utilities
node scripts/color-utils.mjs contrast "#0a0a0b" "#f3f0e8"
node scripts/color-utils.mjs auto-text "#0a0a0a"
node scripts/color-utils.mjs theme "#002FA7"
```

## File Structure

```
NBDE-cover-design-skill/
├── SKILL.md                         ← Skill definition (7-step workflow)
├── README.md
├── assets/
│   ├── templates/
│   │   ├── editorial.html           ← Editorial seed (6 themes, 3+ sizes, custom)
│   │   ├── swiss.html               ← Swiss seed (4 accents, 3+ sizes, custom)
│   │   └── portrait.html            ← Portrait seed (6 layouts, face avoidance)
│   ├── layouts/
│   │   ├── editorial-16.js          ← M01-M16 layout functions
│   │   ├── swiss-12.js              ← S01-S12 layout functions
│   │   └── portrait-6.js            ← P01-P06 layout functions
│   ├── magazine-bg-webgl.js         ← WebGL ink-flow background
│   └── fonts/                        ← Font files
├── scripts/
│   ├── render.mjs                   ← Playwright PNG renderer
│   ├── face-detect.mjs              ← MediaPipe face detection
│   ├── image-gen.mjs                ← AI image generation (multi-provider)
│   └── color-utils.mjs              ← Contrast calculation + auto text color
└── references/
    ├── themes.md                    ← 10 preset themes + custom color rules
    ├── layouts-cover.md             ← 28 cover layout recipes
    ├── layouts-portrait.md          ← 6 portrait layout recipes
    ├── platforms.md                  ← Platform size specs
    ├── portrait-rules.md            ← Face avoidance rules
    └── qa-checklist.md              ← Quality checklist
```

## Trigger Keywords

- "封面" / "封面图" / "头图" / "cover"
- "公众号封面" / "WeChat cover"
- "小红书封面" / "Xiaohongshu cover"
- "人像封面" / "portrait cover"
- "AI生图" / "generate image"

## Credits

Built upon the excellent work from:
- [guizang-social-card-skill](https://github.com/op7418/guizang-social-card-skill) — Visual system, theme presets, layout recipes
- [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) — Swiss & Editorial design principles
- [html-anything](https://github.com/nexu-io/html-anything) — Template ecosystem
- [baoyu-skills](https://github.com/JimLiu/baoyu-skills) — Multi-provider AI image generation

## License

MIT
