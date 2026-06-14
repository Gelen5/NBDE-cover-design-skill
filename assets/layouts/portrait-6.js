/**
 * portrait-6.js — Portrait cover layout injection functions (P01-P06)
 *
 * These functions generate HTML for portrait cover layouts.
 * Face detection data is passed via the `face` parameter:
 *   { x, y, w, h, centerX, centerY, area }
 * All coordinates are normalized 0-1.
 */

export function P01_LeftPortrait({ title, subtitle, kicker, imageUrl, face }) {
  return `
<section class="poster xhs" data-layout="P01">
  <div class="portrait-section" style="background-image:url('${imageUrl}')"></div>
  <div class="text-section">
    ${kicker ? `<p class="meta">${kicker}</p>` : ''}
    <h1 class="h-hero">${title}</h1>
    ${subtitle ? `<p class="lead">${subtitle}</p>` : ''}
  </div>
</section>`;
}

export function P02_RightPortrait({ title, subtitle, kicker, imageUrl, face }) {
  return `
<section class="poster xhs" data-layout="P02">
  <div class="text-section">
    ${kicker ? `<p class="meta">${kicker}</p>` : ''}
    <h1 class="h-hero">${title}</h1>
    ${subtitle ? `<p class="lead">${subtitle}</p>` : ''}
  </div>
  <div class="portrait-section" style="background-image:url('${imageUrl}')"></div>
</section>`;
}

export function P03_BackgroundPortrait({ title, subtitle, imageUrl, face }) {
  const faceSide = face ? (face.centerX < 0.4 ? 'left' : face.centerX > 0.6 ? 'right' : 'center') : 'right';
  return `
<section class="poster xhs" data-layout="P03" data-face-side="${faceSide}">
  <div class="portrait-section" style="background-image:url('${imageUrl}')"></div>
  <div class="overlay"></div>
  <div class="text-section">
    <h1 class="h-hero on-image">${title}</h1>
    ${subtitle ? `<p class="lead on-image">${subtitle}</p>` : ''}
  </div>
</section>`;
}

export function P04_TopPortrait({ title, subtitle, kicker, imageUrl, face }) {
  return `
<section class="poster xhs" data-layout="P04">
  <div class="portrait-section" style="background-image:url('${imageUrl}')"></div>
  <div class="text-section">
    ${kicker ? `<p class="meta">${kicker}</p>` : ''}
    <h1 class="h-xl">${title}</h1>
    ${subtitle ? `<p class="lead">${subtitle}</p>` : ''}
  </div>
</section>`;
}

export function P05_CollagePortrait({ title, subtitle, images, collageCount }) {
  const count = collageCount || (images ? images.length : 4);
  const grid = (images || []).map(img => `
    <div class="collage-item" style="background-image:url('${img.url || img}')"></div>`).join('\n    ');
  return `
<section class="poster xhs" data-layout="P05" data-collage="${count}">
  <div class="collage-grid">
    ${grid}
  </div>
  <div class="text-section">
    <h1 class="h-xl">${title}</h1>
    ${subtitle ? `<p class="lead">${subtitle}</p>` : ''}
  </div>
</section>`;
}

export function P06_MinimalPortrait({ title, subtitle, kicker, imageUrl, shape, position }) {
  return `
<section class="poster xhs" data-layout="P06" data-portrait-shape="${shape || 'circle'}" data-portrait-position="${position || 'top-left'}">
  <div class="minimal-portrait" style="background-image:url('${imageUrl}')"></div>
  <div class="text-section">
    ${kicker ? `<p class="meta">${kicker}</p>` : ''}
    <h1 class="h-hero">${title}</h1>
    ${subtitle ? `<p class="h-sub">${subtitle}</p>` : ''}
  </div>
</section>`;
}
