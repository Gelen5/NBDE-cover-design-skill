# Theme Presets

Use one theme for one cover image. Do not mix palettes across pages unless explicitly requested.

## Editorial Magazine x E-ink Palettes

Switch via `<html data-theme="...">`. Use `<html data-theme="custom">` for user-defined colors.

### Ink Classic

Default. Use for business commentary, AI essays, product thinking, neutral editorial.

```css
:root, [data-theme="ink-classic"] {
  --paper: #f3f0e8;
  --paper-2: #ebe6da;
  --ink: #0a0a0b;
  --muted: #68625a;
  --line: rgba(10,10,11,.22);
  --accent: #111111;
  --accent-soft: #d8d2c6;
  --ink-rgb: 10,10,11;
  --paper-rgb: 243,240,232;
  --accent-rgb: 17,17,17;
}
```

### Indigo Porcelain

Use for technology, research, data, AI infrastructure, analytical writing.

```css
[data-theme="indigo-porcelain"] {
  --paper: #f2f4f5;
  --paper-2: #e5ebef;
  --ink: #0a1f3d;
  --muted: #5f6d78;
  --line: rgba(10,31,61,.20);
  --accent: #315d93;
  --accent-soft: #d7e1ec;
  --ink-rgb: 10,31,61;
  --paper-rgb: 242,244,245;
  --accent-rgb: 49,93,147;
}
```

### Forest Ink

Use for hiking, outdoor, nature, sustainability, field notes.

```css
[data-theme="forest-ink"] {
  --paper: #f5f1e8;
  --paper-2: #e8dfcf;
  --ink: #16251b;
  --muted: #5d665d;
  --line: rgba(22,37,27,.22);
  --accent: #2e6b4f;
  --accent-soft: #d4dfd2;
  --ink-rgb: 22,37,27;
  --paper-rgb: 245,241,232;
  --accent-rgb: 46,107,79;
}
```

### Kraft Paper

Use for memory, craft, personal essays, old objects, warm low-tech topics.

```css
[data-theme="kraft-paper"] {
  --paper: #eedfc7;
  --paper-2: #dfc9a8;
  --ink: #2a1e13;
  --muted: #755f49;
  --line: rgba(42,30,19,.24);
  --accent: #9b5a2e;
  --accent-soft: #d5b58f;
  --ink-rgb: 42,30,19;
  --paper-rgb: 238,223,199;
  --accent-rgb: 155,90,46;
}
```

### Dune

Use for design, object studies, portfolio covers, restrained aesthetic.

```css
[data-theme="dune"] {
  --paper: #f0e6d2;
  --paper-2: #ded0b7;
  --ink: #1f1a14;
  --muted: #6f6557;
  --line: rgba(31,26,20,.22);
  --accent: #8f7650;
  --accent-soft: #d4c2a4;
  --ink-rgb: 31,26,20;
  --paper-rgb: 240,230,210;
  --accent-rgb: 143,118,80;
}
```

### Midnight Ink

The ONLY official dark Editorial palette. Use for game key art, night photography, cinematic covers. Do not improvise other dark palettes.

```css
[data-theme="midnight-ink"] {
  --paper: #0e0d0c;
  --paper-2: #1a1714;
  --ink: #ece2cf;
  --muted: #9a8c75;
  --line: rgba(236,226,207,.22);
  --accent: #d4a04a;
  --accent-soft: #3a2a14;
  --ink-rgb: 236,226,207;
  --paper-rgb: 14,13,12;
  --accent-rgb: 212,160,74;
}
```

Midnight Ink also requires background layer overrides (built into the seed template):

```css
[data-theme="midnight-ink"] .grain {
  opacity: .26;
  mix-blend-mode: screen;
  background-image: radial-gradient(rgba(255,244,214,.10) 1px, transparent 1px);
}
[data-theme="midnight-ink"] .paper-wash {
  background:
    radial-gradient(80% 50% at 28% 16%, rgba(212,160,74,.12), transparent 64%),
    radial-gradient(70% 60% at 80% 86%, rgba(60,40,20,.20), transparent 72%),
    linear-gradient(180deg, rgba(236,226,207,.02), rgba(0,0,0,.32));
}
```

## Swiss International Palettes

Switch via `<html data-accent="...">`. Use `<html data-accent="custom">` for user-defined accent.

### IKB Blue (Default)

Use for AI, technology, product updates, design, engineering.

```css
:root, [data-accent="ikb"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #002FA7;
  --accent-on: #ffffff;
}
```

### Lemon Yellow

Use for young, consumer, active, retail, sporty, playful.

```css
[data-accent="lemon-yellow"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FFD500;
  --accent-on: #0a0a0a;
}
```

### Lemon Green

Use for ecology, future, emerging tech, health, contemporary.

```css
[data-accent="lemon-green"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #C5E803;
  --accent-on: #0a0a0a;
}
```

### Safety Orange

Use for industrial, warning, urgency, risk, decision points.

```css
[data-accent="safety-orange"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FF6B35;
  --accent-on: #ffffff;
}
```

## Custom Color Mode

When the user specifies a custom color, switch to `data-theme="custom"` (Editorial) or `data-accent="custom"` (Swiss) and set the `--user-*` CSS variables.

```css
/* Editorial custom */
[data-theme="custom"] {
  --paper: var(--user-paper, #f3f0e8);
  --paper-2: var(--user-paper-2, #ebe6da);
  --ink: var(--user-ink, #0a0a0b);
  --muted: var(--user-muted, #68625a);
  --line: var(--user-line, rgba(10,10,11,.22));
  --accent: var(--user-accent, #111111);
  --accent-soft: var(--user-accent-soft, #d8d2c6);
  --ink-rgb: var(--user-ink-rgb, 10,10,11);
  --paper-rgb: var(--user-paper-rgb, 243,240,232);
  --accent-rgb: var(--user-accent-rgb, 17,17,17);
}

/* Swiss custom */
[data-accent="custom"] {
  --paper: var(--user-paper, #fafaf8);
  --ink: var(--user-ink, #0a0a0a);
  --grey-1: var(--user-grey-1, #f0f0ee);
  --grey-2: var(--user-grey-2, #d4d4d2);
  --grey-3: var(--user-grey-3, #737373);
  --accent: var(--user-accent, #002FA7);
  --accent-on: var(--user-accent-on, #ffffff);
}
```

When a user says "use blue" or "background #1a1a2e", use `scripts/color-utils.mjs` to:
1. Generate a full theme from the user's color
2. Auto-calculate text color for contrast
3. Set all `--user-*` variables

### Quick Color Mapping

| User says | Set --user-accent | Theme |
|-----------|------------------|-------|
| "蓝色" / "blue" | #002FA7 | Swiss ikb or Editorial custom |
| "红色" / "red" | #FF6B35 | Swiss safety-orange or custom |
| "绿色" / "green" | #2e6b4f | Editorial forest-ink or custom |
| "黄色" / "yellow" | #FFD500 | Swiss lemon-yellow |
| "紫色" / "purple" | #6C3CE1 | custom |
| "粉色" / "pink" | #FF69B4 | custom |
| "黑色背景" | --user-paper: #0a0a0a | Editorial midnight-ink or custom dark |
| "白色背景" | --user-paper: #fafaf8 | Swiss default or custom light |
