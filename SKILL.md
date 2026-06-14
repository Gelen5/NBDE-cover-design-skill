---
name: nbde-cover-design-skill
description: Generate multi-platform cover images, portrait covers, and AI-generated images. Supports custom ratios, custom colors, 10 theme presets, 20+ layout recipes, and 6 portrait layouts with MediaPipe face detection. Use when the user asks for 封面, cover, 头图, 小红书封面, 公众号封面, 人像封面, or AI生图.
---

# NBDE Cover Design Skill

One-skill cover image generator: AI image generation, multi-platform covers, and personalized portrait covers.

## What To Produce

**Capability 1 — AI Image Generation**
Generate images from text prompts using multiple providers (DashScope, OpenAI, Google, MiniMax, Jimeng). Supports text-to-image, reference-image, batch generation.

**Capability 3 — Multi-Platform Covers**
Generate cover images for WeChat Official Account (21:9 + 1:1), Xiaohongshu/Rednote (3:4 + 1:1), Twitter/X (16:9), YouTube (16:9), and custom ratios.

**Capability 4 — Portrait Covers**
Generate personalized covers from user-uploaded photos + topic. Uses MediaPipe face detection to ensure text avoids faces. Supports 6 portrait layouts (P01-P06).

Do NOT use this skill for:
- Full slide decks or horizontal PPT websites. Use a PPT skill instead.
- Long-form video generation.
- Pure image editing with no layout requirement.

## Core Principles

1. **Custom is first-class** — custom colors and custom ratios are never hidden features. User says "blue" or "16:9", it happens immediately.
2. **Layout before freeform** — always pick from layout recipes first, then customize. Never invent layouts from scratch.
3. **Face avoidance is non-negotiable** — text regions must have IOU < 0.3 with detected face bounding boxes.
4. **Contrast check is automatic** — every output must pass WCAG 2.0 contrast ratio >= 4.5:1 for text.
5. **Iterate fast** — color/ratio/layout changes should re-render in < 15 seconds.

## Intent Detection

When the user sends a message, detect which capability to activate:

| User says | Has image? | Capability |
|-----------|-----------|------------|
| "生成图片" + prompt | No | 1 (AI Image Gen) |
| "做个封面" + topic | No | 3 (Multi-Platform Cover) |
| "做个封面" + article | No | 3 (Multi-Platform Cover) |
| "用这张图做封面" | Yes, no face focus | 3 (Cover with user image) |
| "用我的照片做封面" + topic | Yes, portrait/selfie | 4 (Portrait Cover) |
| "帮我生成一张关于X的图" | No | 1 (AI Image Gen) |
| "公众号头图" | Any | 3 (Multi-Platform Cover) |
| "小红书封面" | Any | 3 (Multi-Platform Cover) |

## Workflow

### Step 1: Intake

Gather the minimum required information:

- **Content source**: article text, topic, title, or prompt
- **Target platform**: WeChat / Xiaohongshu / Twitter / YouTube / Custom
- **Images**: user-supplied photos, screenshots, or "use AI to generate"
- **For portrait covers**: user photo + topic/theme

If the user provides only text and no images, ask once:

```
需要配图，三种方式：
A. 你有照片/截图，传给我（推荐）
B. 我去 Unsplash/Pexels 帮你找
C. 用 AI 生成
```

Accept whatever the user picks and proceed. Do not re-prompt.

### Step 2: Style & Theme

Pick one visual system:

**Editorial Magazine** — serif display, paper + ink palette, magazine-feature feel.
- 6 presets: ink-classic, indigo-porcelain, forest-ink, kraft-paper, dune, midnight-ink
- Set via `<html data-theme="...">`

**Swiss International** — Inter/Helvetica, strict grid, one accent color, data feel.
- 4 presets: ikb, lemon-yellow, lemon-green, safety-orange
- Set via `<html data-accent="...">`

**Custom Color** — user specifies any color:
- Primary (main text/element color)
- Background (page color)
- Accent (highlight color, optional)
- Text color is auto-calculated for contrast

Read `references/themes.md` for exact CSS tokens.

### Step 3: Layout Selection

Pick a layout recipe based on content structure:

**Editorial layouts (M01-M16)**: see `references/layouts-cover.md`
**Swiss layouts (S01-S12)**: see `references/layouts-cover.md`
**Portrait layouts (P01-P06)**: see `references/layouts-portrait.md`

AI recommends top-3 layouts, user confirms or picks their own.

### Step 4: Generate Preview

1. Copy the appropriate seed template into a task folder:
   - Editorial → `assets/templates/editorial.html`
   - Swiss → `assets/templates/swiss.html`
   - Portrait → `assets/templates/portrait.html`
2. Fill in content, set theme/accent, inject layout
3. For portrait covers: run `scripts/face-detect.mjs` to detect faces and calculate safe text zones
4. Render with Playwright: `node scripts/render.mjs <html-path> <output-path> --width W --height H`
5. Show the PNG to the user

### Step 5: Iterate

User can change anything at any time:

- **Change color**: "换成蓝色" / "背景改成白色" → update CSS variables → re-render
- **Change ratio**: "改成 16:9" / "做成正方形" → update canvas dimensions → re-render
- **Change layout**: "换个版式" → swap layout class → re-render
- **Change text**: "标题改成..." → update content → re-render
- **AI regenerate image**: "这张图不好看" → re-call image generation → re-render
- **Portrait adjustments**: "人像放大" / "文字移到右边" → update portrait params → re-render

### Step 6: Quality Check (automatic)

Before final delivery, verify:

- Contrast ratio >= 4.5:1 for all text on background
- Text zones do not overlap face bounding boxes (portrait mode)
- No overflow or clipping issues
- Canvas dimensions match target platform

### Step 7: Deliver

Output PNG file to the user. Optionally also provide the HTML file.

## Required References

Read these files as needed:

- `references/themes.md` — 10 preset themes + custom color rules
- `references/layouts-cover.md` — 20+ cover layout recipes (Editorial + Swiss)
- `references/layouts-portrait.md` — 6 portrait layout recipes + face avoidance rules
- `references/platforms.md` — platform sizes, ratios, naming conventions
- `references/portrait-rules.md` — face detection, avoidance, overlay, crop rules
- `references/qa-checklist.md` — quality check list

## Template System

All templates use CSS custom properties for theming. Changing a color = changing one variable.

```css
:root {
  --paper: #f3f0e8;      /* Background — user can change */
  --ink: #0a0a0b;        /* Primary text — auto-calculated for contrast */
  --accent: #002FA7;     /* Highlight — user can change */
  --canvas-w: 2100;       /* Width in px — user can change */
  --canvas-h: 900;        /* Height in px — user can change */
}
```

Never write HTML from scratch. Always start from a seed template.

## AI Image Generation

When the user needs an AI-generated image, use `scripts/image-gen.mjs`:

```bash
node scripts/image-gen.mjs --prompt "description" --provider dashscope --size 1024x1792 --count 4
```

Supported providers: dashscope, openai, google, minimax, jimeng

Requires API key in environment variables:
- `DASHSCOPE_API_KEY` for DashScope
- `OPENAI_API_KEY` for OpenAI
- etc.

## Portrait Cover Pipeline

1. User uploads photo + provides topic
2. Run face detection: `node scripts/face-detect.mjs <image-path>`
3. Get face bounding boxes and landmarks
4. Calculate safe text zone based on face positions and chosen layout (P01-P06)
5. Inject face data into portrait template CSS variables
6. Render with Playwright
7. Show to user, iterate

## File Structure

```
nbde-cover-design-skill/
├── SKILL.md                    ← You are here
├── README.md
├── assets/
│   ├── templates/
│   │   ├── editorial.html     ← Editorial seed (6 themes, 3+ sizes)
│   │   ├── swiss.html         ← Swiss seed (4 accents, 3+ sizes)
│   │   └── portrait.html      ← Portrait seed (6 layouts, face avoidance)
│   ├── layouts/
│   │   ├── editorial-16.js   ← Editorial layout injection functions
│   │   ├── swiss-12.js       ← Swiss layout injection functions
│   │   └── portrait-6.js     ← Portrait layout injection functions
│   └── fonts/                  ← Font files (or CDN links)
├── scripts/
│   ├── render.mjs             ← Playwright PNG renderer
│   ├── face-detect.mjs        ← MediaPipe face detection
│   ├── image-gen.mjs          ← AI image generation (multi-provider)
│   └── color-utils.mjs        ← Contrast calculation + auto text color
└── references/
    ├── themes.md              ← Theme presets + custom color rules
    ├── layouts-cover.md       ← Cover layout recipes
    ├── layouts-portrait.md    ← Portrait layout recipes + face rules
    ├── platforms.md            ← Platform size specs
    ├── portrait-rules.md      ← Face avoidance rules
    └── qa-checklist.md       ← Quality checklist
```
