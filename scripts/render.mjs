#!/usr/bin/env node
/**
 * render.mjs — Playwright PNG renderer for NBDE Cover Design Skill
 *
 * Usage:
 *   node scripts/render.mjs <html-path> <output-path> [--width W] [--height H] [--scale 2] [--selector .poster.xhs]
 *
 * Examples:
 *   node scripts/render.mjs output/index.html output/cover.png
 *   node scripts/render.mjs output/index.html output/cover.png --width 2100 --height 900 --scale 2
 *   node scripts/render.mjs output/index.html output/square.png --selector ".poster.square"
 */

import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

function parseArgs(args) {
  const opts = {
    htmlPath: null,
    outputPath: null,
    width: null,
    height: null,
    scale: 2,
    selector: null,
  };
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--width' && args[i + 1]) { opts.width = parseInt(args[++i], 10); continue; }
    if (args[i] === '--height' && args[i + 1]) { opts.height = parseInt(args[++i], 10); continue; }
    if (args[i] === '--scale' && args[i + 1]) { opts.scale = parseFloat(args[++i]); continue; }
    if (args[i] === '--selector' && args[i + 1]) { opts.selector = args[++i]; continue; }
    positional.push(args[i]);
  }
  opts.htmlPath = positional[0] || null;
  opts.outputPath = positional[1] || null;
  return opts;
}

async function render(opts) {
  if (!opts.htmlPath || !opts.outputPath) {
    console.error('Usage: node render.mjs <html-path> <output-path> [--width W] [--height H] [--scale 2] [--selector sel]');
    process.exit(1);
  }

  const htmlAbs = path.resolve(opts.htmlPath);
  const outputAbs = path.resolve(opts.outputPath);

  if (!fs.existsSync(htmlAbs)) {
    console.error(`HTML file not found: ${htmlAbs}`);
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(outputAbs);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Open the HTML file
  const fileUrl = pathToFileURL(htmlAbs).href;
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });

  // Determine target element
  const targetSelector = opts.selector || '.poster';

  // If width/height specified, set viewport
  if (opts.width && opts.height) {
    const viewW = Math.min(opts.width, 1920);
    const viewH = Math.min(opts.height, 1080);
    await page.setViewportSize({ width: viewW, height: viewH });
  }

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Wait a bit for WebGL backgrounds if any
  await page.waitForTimeout(500);

  // Find the target element
  const element = await page.$(targetSelector);
  if (!element) {
    console.error(`Element not found: ${targetSelector}`);
    await browser.close();
    process.exit(1);
  }

  // Screenshot the element
  await element.screenshot({
    path: outputAbs,
    type: 'png',
    omitBackground: true,
  });

  // Get actual dimensions
  const box = await element.boundingBox();

  await browser.close();

  console.log(`Rendered: ${outputAbs}`);
  if (box) {
    console.log(`Dimensions: ${Math.round(box.width * opts.scale)}x${Math.round(box.height * opts.scale)} @${opts.scale}x`);
  }

  return outputAbs;
}

// Run
const opts = parseArgs(process.argv.slice(2));
render(opts).catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});
