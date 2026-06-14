#!/usr/bin/env node
/**
 * color-utils.mjs — Color utility functions for NBDE Cover Design Skill
 *
 * Functions:
 *   - WCAG 2.0 contrast ratio calculation
 *   - Auto text color selection (light/dark) based on background
 *   - Hex to RGB conversion
 *   - Relative luminance calculation
 *
 * Usage (CLI):
 *   node scripts/color-utils.mjs contrast "#0a0a0b" "#f3f0e8"
 *   node scripts/color-utils.mjs auto-text "#0a0a0a"
 *   node scripts/color-utils.mjs hex-to-rgb "#002FA7"
 */

// ====== Core Functions ======

/**
 * Convert hex color to RGB
 * @param {string} hex - Color in #RRGGBB format
 * @returns {{ r: number, g: number, b: number }}
 */
export function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Calculate relative luminance (WCAG 2.0)
 * @param {{ r: number, g: number, b: number }} rgb
 * @returns {number} luminance 0-1
 */
export function relativeLuminance(rgb) {
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate WCAG 2.0 contrast ratio between two colors
 * @param {string} color1 - Hex color
 * @param {string} color2 - Hex color
 * @returns {number} contrast ratio (1-21)
 */
export function contrastRatio(color1, color2) {
  const l1 = relativeLuminance(hexToRgb(color1));
  const l2 = relativeLuminance(hexToRgb(color2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG 2.0 AA standard
 * @param {string} color1 - Text color (hex)
 * @param {string} color2 - Background color (hex)
 * @param {'AA'|'AAA'} level
 * @param {'normal'|'large'} size - normal text (>= 4.5:1) or large text (>= 3:1)
 * @returns {{ pass: boolean, ratio: number, required: number }}
 */
export function checkContrast(color1, color2, level = 'AA', size = 'normal') {
  const ratio = contrastRatio(color1, color2);
  const required = level === 'AAA'
    ? (size === 'large' ? 4.5 : 7)
    : (size === 'large' ? 3 : 4.5);
  return { pass: ratio >= required, ratio: Math.round(ratio * 100) / 100, required };
}

/**
 * Auto-select text color (light or dark) based on background
 * @param {string} bgColor - Background color (hex)
 * @param {string} darkColor - Dark text color option (default #0a0a0a)
 * @param {string} lightColor - Light text color option (default #f5f5f5)
 * @returns {{ color: string, ratio: number, pass: boolean }}
 */
export function autoTextColor(bgColor, darkColor = '#0a0a0a', lightColor = '#f5f5f5') {
  const darkRatio = contrastRatio(darkColor, bgColor);
  const lightRatio = contrastRatio(lightColor, bgColor);

  if (darkRatio >= lightRatio) {
    return { color: darkColor, ratio: Math.round(darkRatio * 100) / 100, pass: darkRatio >= 4.5 };
  }
  return { color: lightColor, ratio: Math.round(lightRatio * 100) / 100, pass: lightRatio >= 4.5 };
}

/**
 * Generate a full theme from a single primary color
 * Useful when user says "use blue" and we need a complete palette
 * @param {string} primaryColor - User's chosen primary color (hex)
 * @returns {{ paper: string, ink: string, accent: string, muted: string, line: string }}
 */
export function generateTheme(primaryColor) {
  const rgb = hexToRgb(primaryColor);
  const lum = relativeLuminance(rgb);

  // If primary is dark, use it as ink on light paper
  // If primary is light, use it as paper with dark ink
  if (lum < 0.3) {
    // Dark primary → use as ink
    const paper = '#f3f0e8';
    const accent = primaryColor;
    const ink = primaryColor;
    const muted = adjustBrightness(primaryColor, 0.5);
    const line = `rgba(${rgb.r},${rgb.g},${rgb.b},.22)`;
    return { paper, ink, accent, muted, line };
  } else if (lum > 0.7) {
    // Light primary → use as paper
    const paper = primaryColor;
    const ink = '#0a0a0b';
    const accent = '#002FA7';
    const muted = '#68625a';
    const line = 'rgba(10,10,11,.22)';
    return { paper, ink, accent, muted, line };
  } else {
    // Medium primary → use as accent
    const paper = '#f3f0e8';
    const ink = '#0a0a0b';
    const accent = primaryColor;
    const muted = '#68625a';
    const line = 'rgba(10,10,11,.22)';
    return { paper, ink, accent, muted, line };
  }
}

function adjustBrightness(hex, factor) {
  const rgb = hexToRgb(hex);
  const r = Math.round(rgb.r * factor + (1 - factor) * 128);
  const g = Math.round(rgb.g * factor + (1 - factor) * 128);
  const b = Math.round(rgb.b * factor + (1 - factor) * 128);
  return rgbToHex(r, g, b);
}

/**
 * Convert hex to RGB string for CSS variables
 * e.g. "#0a0a0b" → "10,10,11"
 */
export function hexToRgbString(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `${r},${g},${b}`;
}

// ====== CLI Interface ======
const args = process.argv.slice(2);
const command = args[0];

if (command === 'contrast' && args[1] && args[2]) {
  const result = checkContrast(args[1], args[2]);
  console.log(`Contrast ratio: ${result.ratio}:1 (required: ${result.required}:1) — ${result.pass ? 'PASS' : 'FAIL'}`);
} else if (command === 'auto-text' && args[1]) {
  const result = autoTextColor(args[1]);
  console.log(`Recommended text color: ${result.color} (contrast: ${result.ratio}:1, ${result.pass ? 'PASS' : 'FAIL'})`);
} else if (command === 'hex-to-rgb' && args[1]) {
  const result = hexToRgb(args[1]);
  console.log(`RGB: ${result.r}, ${result.g}, ${result.b}`);
  console.log(`RGB string: ${hexToRgbString(args[1])}`);
} else if (command === 'theme' && args[1]) {
  const theme = generateTheme(args[1]);
  console.log('Generated theme:');
  console.log(JSON.stringify(theme, null, 2));
  console.log('\nCSS variables:');
  console.log(`--paper: ${theme.paper};`);
  console.log(`--ink: ${theme.ink};`);
  console.log(`--accent: ${theme.accent};`);
  console.log(`--muted: ${theme.muted};`);
  console.log(`--line: ${theme.line};`);
  console.log(`--ink-rgb: ${hexToRgbString(theme.ink)};`);
  console.log(`--paper-rgb: ${hexToRgbString(theme.paper)};`);
  console.log(`--accent-rgb: ${hexToRgbString(theme.accent)};`);
} else {
  console.log('NBDE Cover Design — Color Utils');
  console.log('');
  console.log('Commands:');
  console.log('  contrast <color1> <color2>   — Check WCAG contrast ratio');
  console.log('  auto-text <bg-color>          — Auto-select text color for background');
  console.log('  hex-to-rgb <hex-color>        — Convert hex to RGB');
  console.log('  theme <primary-color>         — Generate full theme from one color');
}
