/**
 * editorial-16.js — Editorial Magazine layout injection functions (M01-M16)
 *
 * Each function returns an HTML string for a poster section.
 * Usage: Call the function with content params, insert result into <!-- POSTERS_HERE -->
 */

export function M01_Cover({ title, subtitle, kicker, imageUrl, issueLine, bottomStrip }) {
  return `
<section class="poster xhs" id="cover-01">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-4">
    <div class="issue-row">
      <span>${issueLine || 'Vol. 01'}</span><span class="dot"></span><span>2026</span>
    </div>
    <div class="stack gap-2">
      <p class="kicker">${kicker || 'COVER'}</p>
      <h1 class="h-display">${title}</h1>
      ${subtitle ? `<p class="h-sub">${subtitle}</p>` : ''}
    </div>
    ${imageUrl ? `<figure class="frame-img r-16x10"><img src="${imageUrl}" alt="cover"></figure>` : ''}
    <p class="lead">${bottomStrip || ''}</p>
  </div>
  <div class="issue-strip">
    <span>Issue · Magazine</span><span>—</span><span>NBDE</span>
  </div>
</section>`;
}

export function M02_FieldNote({ title, imageUrl, caption, takeaway }) {
  return `
<section class="poster xhs" id="field-note">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-3">
    <figure class="frame-img r-3x2"><img src="${imageUrl}" alt="field note"></figure>
    <h1 class="h-xl">${title}</h1>
    ${caption ? `<p class="meta">${caption}</p>` : ''}
    ${takeaway ? `<p class="lead">${takeaway}</p>` : ''}
  </div>
</section>`;
}

export function M03_EssaySplit({ title, paragraphs, quote }) {
  return `
<section class="poster xhs" id="essay-split">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content">
    <div class="col-2-7-5" style="height:100%;align-items:center">
      <div class="stack gap-3">
        ${quote ? `<p class="pullquote">${quote}</p>` : `<h1 class="h-display">${title}</h1>`}
      </div>
      <div class="stack gap-2">
        ${(paragraphs || []).map(p => `<p class="body">${p}</p>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>`;
}

export function M04_PullQuote({ quote, source, kicker }) {
  return `
<section class="poster xhs" id="pull-quote">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-4" style="justify-content:center">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    <p class="pullquote">${quote}</p>
    <hr class="rule-accent">
    ${source ? `<p class="meta">${source}</p>` : ''}
  </div>
  <div class="issue-strip"><span>Quote</span><span>—</span><span>NBDE</span></div>
</section>`;
}

export function M05_Checklist({ title, items }) {
  const rows = (items || []).map((item, i) => `
    <div class="ledger-row">
      <span class="ledger-nb">${String(i + 1).padStart(2, '0')}</span>
      <span class="ledger-title">${item.title}</span>
      <span class="ledger-note">${item.note || ''}</span>
    </div>`).join('');
  return `
<section class="poster xhs" id="checklist">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-3">
    <h1 class="h-xl">${title}</h1>
    <div class="ledger">${rows}</div>
  </div>
</section>`;
}

export function M06_EvidenceWall({ title, images }) {
  const grid = (images || []).map(img => `
    <figure class="frame-img r-4x3">
      <img src="${img.url}" alt="${img.caption || ''}">
    </figure>
    ${img.caption ? `<p class="img-cap">${img.caption}</p>` : ''}`).join('');
  return `
<section class="poster xhs" id="evidence-wall">
  <div class="grain"></div>
  <div class="content stack gap-3">
    <h1 class="h-xl">${title}</h1>
    <div class="col-2">${grid}</div>
  </div>
</section>`;
}

export function M07_ClosingNote({ title, items, closing }) {
  const rows = (items || []).map(item => `
    <div class="ledger-row">
      <span class="ledger-title">${item.title}</span>
      <span class="ledger-note">${item.note || ''}</span>
    </div>`).join('');
  return `
<section class="poster xhs" id="closing">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-3">
    <h1 class="h-xl">${title}</h1>
    <div class="ledger">${rows}</div>
    <div class="callout">${closing || ''}</div>
  </div>
</section>`;
}

export function M08_TallLedger({ title, items }) {
  const rows = (items || []).map((item, i) => `
    <div class="ledger-row">
      <span class="ledger-nb">${String(i + 1).padStart(2, '0')}</span>
      <div class="stack gap-1">
        <span class="ledger-title">${item.title}</span>
        <span class="ledger-note">${item.desc || ''}</span>
      </div>
    </div>`).join('');
  return `
<section class="poster xhs" id="tall-ledger">
  <div class="grain"></div>
  <div class="content stack gap-3">
    <h1 class="h-xl">${title}</h1>
    <div class="ledger">${rows}</div>
  </div>
</section>`;
}

export function M09_AtmosphericThesis({ thesis, notes, kicker }) {
  return `
<section class="poster xhs" id="atmospheric">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="paper-wash"></div>
  <div class="content stack gap-4" style="justify-content:center">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    <p class="pullquote">${thesis}</p>
    ${(notes || []).map(n => `<p class="lead">${n}</p>`).join('\n    ')}
    <div class="issue-strip"><span>Thesis</span><span>—</span><span>NBDE</span></div>
  </div>
</section>`;
}

// M10-M16 follow same pattern — abbreviated for brevity
export function M10_EvidenceFeature({ title, lead, imageUrl, takeaways }) {
  return `
<section class="poster xhs" id="evidence-feature">
  <div class="grain"></div>
  <div class="content stack gap-3">
    <div class="stack gap-2">
      <h1 class="h-xl">${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    <figure class="frame-img r-16x9"><img src="${imageUrl}" alt="evidence"></figure>
    <div class="stack gap-1">
      ${(takeaways || []).map(t => `<p class="meta">→ ${t}</p>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function M11_MarginaliaEssay({ title, paragraphs, marginNotes }) {
  return `
<section class="poster xhs" id="marginalia">
  <div class="grain"></div>
  <div class="content">
    <h1 class="h-display" style="margin-bottom:32px">${title}</h1>
    <div class="marginalia">
      <div class="stack gap-2">
        ${(paragraphs || []).map(p => `<p class="body">${p}</p>`).join('\n        ')}
      </div>
      <div class="mg-col">
        ${(marginNotes || []).map(n => `<p>${n}</p>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>`;
}

export function M12_SectionDivider({ section, subtitle, kicker }) {
  return `
<section class="poster xhs" id="divider">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-4" style="justify-content:center;align-items:flex-start">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    <h1 class="h-display">${section}</h1>
    ${subtitle ? `<p class="h-sub">${subtitle}</p>` : ''}
  </div>
</section>`;
}

export function M13_HeroQuestion({ question, context }) {
  return `
<section class="poster xhs" id="hero-question">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-4" style="justify-content:center">
    <h1 class="h-display">${question}</h1>
    ${context ? `<p class="h-sub">${context}</p>` : ''}
  </div>
</section>`;
}

export function M14_ProfileCard({ name, role, bio, imageUrl }) {
  return `
<section class="poster xhs" id="profile">
  <div class="grain"></div>
  <div class="content stack gap-3">
    ${imageUrl ? `<figure class="frame-img r-3x4"><img src="${imageUrl}" alt="${name}"></figure>` : ''}
    <p class="kicker">${role || ''}</p>
    <h1 class="h-display">${name}</h1>
    ${bio ? `<p class="lead">${bio}</p>` : ''}
  </div>
</section>`;
}

export function M15_ComparisonTable({ title, columns, rows }) {
  const headers = (columns || []).map(c => `<div class="ledger-title">${c}</div>`).join('');
  const body = (rows || []).map(row => `
    <div class="ledger-row">
      ${(row || []).map(cell => `<span class="ledger-note">${cell}</span>`).join('')}
    </div>`).join('');
  return `
<section class="poster xhs" id="comparison">
  <div class="grain"></div>
  <div class="content stack gap-3">
    <h1 class="h-xl">${title}</h1>
    <div class="ledger">
      <div class="ledger-row">${headers}</div>
      ${body}
    </div>
  </div>
</section>`;
}

export function M16_Timeline({ title, events }) {
  const nodes = (events || []).map(e => `
    <div class="pipeline-v step">
      <span class="step-nb">${e.date || ''}</span>
      <div>
        <p class="step-title">${e.title || ''}</p>
        <p class="step-desc">${e.desc || ''}</p>
      </div>
    </div>`).join('');
  return `
<section class="poster xhs" id="timeline">
  <div class="grain"></div>
  <div class="content stack gap-3">
    <h1 class="h-xl">${title}</h1>
    <div class="pipeline-v">${nodes}</div>
  </div>
</section>`;
}
