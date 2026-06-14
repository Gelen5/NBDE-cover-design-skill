/**
 * swiss-12.js — Swiss International layout injection functions (S01-S12)
 */

export function S01_KPITower({ kpis }) {
  const items = (kpis || []).map(k => `
    <div class="stack gap-1" style="text-align:center">
      <p class="meta">${k.label}</p>
      <p class="h-hero">${k.value}</p>
      ${k.delta ? `<p class="meta" style="color:var(--accent)">${k.delta}</p>` : ''}
    </div>`).join('');
  return `
<section class="poster xhs" id="kpi-tower">
  <div class="content stack gap-5" style="justify-content:center">
    ${items}
  </div>
</section>`;
}

export function S02_HBarChart({ title, bars }) {
  const maxVal = Math.max(...(bars || []).map(b => b.value));
  const items = (bars || []).map(b => `
    <div style="display:flex;align-items:center;gap:var(--sp-5);margin-bottom:var(--sp-4)">
      <span class="meta" style="width:120px;text-align:right">${b.label}</span>
      <div style="flex:1;height:48px;background:var(--grey-1);border-radius:2px;overflow:hidden">
        <div style="height:100%;width:${(b.value / maxVal) * 100}%;background:${b.highlight ? 'var(--accent)' : 'var(--grey-2)'}"></div>
      </div>
      <span class="meta">${b.value}</span>
    </div>`).join('');
  return `
<section class="poster xhs" id="h-bar">
  <div class="content stack gap-4">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    ${items}
  </div>
</section>`;
}

export function S03_MatrixHero({ hero, cards }) {
  const grid = (cards || []).map(c => `
    <div class="card-fill${c.highlight ? ' accent' : ''}">
      <p class="meta">${c.label || ''}</p>
      <p class="h-md">${c.title}</p>
      ${c.desc ? `<p class="body">${c.desc}</p>` : ''}
    </div>`).join('');
  return `
<section class="poster xhs" id="matrix-hero">
  <div class="content stack gap-4">
    <h1 class="h-xl">${hero}</h1>
    <div class="matrix">${grid}</div>
  </div>
</section>`;
}

export function S04_ProcessFlow({ title, steps }) {
  const items = (steps || []).map((s, i) => `
    <div style="display:flex;align-items:flex-start;gap:var(--sp-5)">
      <div style="min-width:64px;height:64px;display:flex;align-items:center;justify-content:center;background:${s.highlight ? 'var(--accent)' : 'var(--grey-1)'};color:${s.highlight ? 'var(--accent-on)' : 'var(--ink)'};border-radius:50%;font-family:var(--sans);font-weight:200;font-size:32px">${i + 1}</div>
      <div class="stack gap-1" style="flex:1">
        <p class="h-md">${s.title}</p>
        ${s.desc ? `<p class="body">${s.desc}</p>` : ''}
      </div>
    </div>`).join('<hr class="rule">');
  return `
<section class="poster xhs" id="process-flow">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    ${items}
  </div>
</section>`;
}

export function S05_ComparisonSlider({ title, left, right }) {
  return `
<section class="poster xhs" id="comparison">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5)">
      <div class="card-fill"><p class="meta">BEFORE</p><p class="h-md">${left?.title || ''}</p><p class="body">${left?.desc || ''}</p></div>
      <div class="card-fill accent"><p class="meta">AFTER</p><p class="h-md">${right?.title || ''}</p><p class="body">${right?.desc || ''}</p></div>
    </div>
  </div>
</section>`;
}

export function S06_IconGrid({ title, icons }) {
  const grid = (icons || []).map(ic => `
    <div style="text-align:center;padding:var(--sp-5)">
      <div style="width:48px;height:48px;margin:0 auto var(--sp-3);background:var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--accent-on)">
        <i data-lucide="${ic.icon || 'circle'}" style="width:24px;height:24px"></i>
      </div>
      <p class="h-md">${ic.label}</p>
      ${ic.desc ? `<p class="meta">${ic.desc}</p>` : ''}
    </div>`).join('');
  return `
<section class="poster xhs" id="icon-grid">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-4)">${grid}</div>
  </div>
</section>`;
}

// S07-S12 follow same pattern
export function S07_StatsGrid({ title, stats }) {
  const grid = (stats || []).map(s => `
    <div class="card-fill${s.highlight ? ' accent' : ''}">
      <p class="meta">${s.label}</p>
      <p class="${s.highlight ? 'h-hero' : 'h-xl'}">${s.value}</p>
    </div>`).join('');
  return `
<section class="poster xhs" id="stats-grid">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5)">${grid}</div>
  </div>
</section>`;
}

export function S08_Timeline({ title, events }) {
  const items = (events || []).map(e => `
    <div style="display:flex;gap:var(--sp-5);padding-bottom:var(--sp-4);border-bottom:1px solid var(--grey-1)">
      <span class="meta" style="min-width:100px">${e.date}</span>
      <div class="stack gap-1">
        <p class="h-md">${e.title}</p>
        ${e.desc ? `<p class="body">${e.desc}</p>` : ''}
      </div>
    </div>`).join('');
  return `
<section class="poster xhs" id="timeline-swiss">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    ${items}
  </div>
</section>`;
}

export function S09_FeatureList({ title, features }) {
  const items = (features || []).map(f => `
    <div class="card-fill${f.highlight ? ' accent' : ''}">
      <p class="h-md">${f.title}</p>
      <p class="body">${f.desc}</p>
    </div>`).join('');
  return `
<section class="poster xhs" id="feature-list">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    <div class="stack gap-2">${items}</div>
  </div>
</section>`;
}

export function S10_PricingTable({ plans }) {
  const cols = (plans || []).map(p => `
    <div class="card-fill${p.recommended ? ' accent' : ''}">
      <p class="meta">${p.name}</p>
      <p class="h-hero">${p.price}</p>
      ${(p.features || []).map(f => `<p class="body">${f}</p>`).join('\n      ')}
    </div>`).join('');
  return `
<section class="poster xhs" id="pricing">
  <div class="content stack gap-3">
    <div style="display:grid;grid-template-columns:repeat(${(plans || []).length},1fr);gap:var(--sp-4)">${cols}</div>
  </div>
</section>`;
}

export function S11_TeamGrid({ title, members }) {
  const grid = (members || []).map(m => `
    <div style="text-align:center">
      ${m.photo ? `<figure class="frame-img r-1x1" style="width:120px;height:120px;margin:0 auto var(--sp-3);border-radius:50%;overflow:hidden"><img src="${m.photo}" alt="${m.name}"></figure>` : ''}
      <p class="h-md">${m.name}</p>
      <p class="meta">${m.role}</p>
    </div>`).join('');
  return `
<section class="poster xhs" id="team">
  <div class="content stack gap-3">
    ${title ? `<h1 class="h-xl">${title}</h1>` : ''}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-5)">${grid}</div>
  </div>
</section>`;
}

export function S12_CTABanner({ statement, action, url }) {
  return `
<section class="poster xhs" id="cta">
  <div style="background:var(--accent);color:var(--accent-on);height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--sp-11);text-align:center">
    <h1 class="h-statement" style="color:var(--accent-on)">${statement}</h1>
    ${action ? `<div style="margin-top:var(--sp-5);padding:var(--sp-5) var(--sp-8);border:2px solid var(--accent-on);border-radius:4px;font-family:var(--sans);font-size:24px;letter-spacing:.08em">${action}</div>` : ''}
    ${url ? `<p class="meta" style="color:var(--accent-on);margin-top:var(--sp-3)">${url}</p>` : ''}
  </div>
</section>`;
}
