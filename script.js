/* ================================================================
   script.js — Why Baltimore Neighborhood Profiles
   Leaflet choropleth + Chart.js side panel
   ================================================================ */

'use strict';

// ── Pinhead.ink inline SVGs ──────────────────────────────────────
// Sources: pinhead.ink (row_houses, arrow_top_right) and
//          github.com/waysidemapping/pinhead (crowd_of_people)

const SVG = {
  row_houses: `<svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" aria-hidden="true"><path d="M10 14L5 14L5 11L3 11L3 14L1 14L1 5.5L14 5.5L14 14L12 14L12 11L10 11L10 14ZM7.25 13L7.75 13L7.75 6.5L7.25 6.5L7.25 13ZM3 7L3 9L5 9L5 7L3 7ZM12 7L10 7L10 9L12 9L12 7ZM11 0.5L14.5 4L14.5 5L0.5 5L0.5 4L4 0.5L7.5 4L11 0.5Z"/></svg>`,

  crowd_of_people: `<svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" aria-hidden="true"><path d="M5.4 1.37C5.4 0.62 6.01 0 6.75 0C7.5 0 8.11 0.62 8.11 1.37C8.11 2.13 7.5 2.74 6.75 2.74C6.01 2.74 5.4 2.13 5.4 1.37ZM3.94 10.66C3.94 11.42 4.55 12.04 5.29 12.04C6.04 12.04 6.65 11.42 6.65 10.66C6.65 9.91 6.04 9.29 5.29 9.29C4.55 9.29 3.94 9.91 3.94 10.66ZM5.78 8.26C6.26 8.36 6.69 8.6 7.01 8.95C6.79 8.58 6.66 8.14 6.66 7.7C6.66 6.45 7.59 5.41 8.81 5.29C8.93 5.27 9.05 5.27 9.16 5.28L9.16 4.69C9.06 4.17 8.59 3.78 8.04 3.78L5.52 3.78C5.17 3.78 4.85 3.93 4.63 4.21L4.67 4.32L4.61 4.32C4.71 4.59 4.77 4.88 4.77 5.17C4.77 5.7 4.59 6.22 4.27 6.65C5.03 6.87 5.61 7.49 5.78 8.26ZM7.7 7.71C7.7 8.46 8.31 9.08 9.06 9.08C9.8 9.08 10.41 8.46 10.41 7.71C10.41 6.95 9.8 6.34 9.06 6.34C8.31 6.34 7.7 6.95 7.7 7.71ZM12.59 4.86C13.34 4.86 13.95 4.24 13.95 3.48C13.95 2.73 13.34 2.11 12.59 2.11C11.85 2.11 11.24 2.73 11.24 3.48C11.24 4.24 11.85 4.86 12.59 4.86ZM3.4 12.15C3.08 11.73 2.9 11.21 2.9 10.67C2.9 9.55 3.65 8.58 4.72 8.31C4.54 7.88 4.12 7.61 3.67 7.61L1.2 7.61C0.77 7.61 0.36 7.81 0.15 8.19C0.05 8.37 0 8.57 0 8.77L0 9.61L0.01 12.9L1.25 12.9L1.25 15L1.88 15L1.88 14.26C1.88 13.29 2.5 12.45 3.4 12.15ZM2.4 6.55C3.15 6.55 3.76 5.94 3.76 5.18C3.76 4.42 3.15 3.81 2.4 3.81C1.66 3.81 1.05 4.42 1.05 5.18C1.05 5.94 1.66 6.55 2.4 6.55ZM11.44 11.06C11.33 10.54 10.89 10.16 10.36 10.14L7.79 10.14C7.75 10.14 7.7 10.14 7.65 10.15C7.69 10.32 7.7 10.49 7.7 10.66C7.7 11.18 7.53 11.69 7.22 12.11L7.49 12.24C8.14 12.54 8.6 13.13 8.73 13.83L8.75 13.91L8.75 15L11.46 15L11.46 11.28C11.46 11.25 11.45 11.22 11.45 11.19L11.44 11.07ZM13.86 5.92L10.67 5.92C11.17 6.38 11.45 7.03 11.46 7.71C11.46 8.24 11.28 8.76 10.97 9.18C12.46 9.59 12.5 11.28 12.5 11.3L12.5 15L13.75 15L13.75 11.2L15 11.2L15 7.07C15 6.43 14.49 5.92 13.86 5.92ZM6.59 13.1L4.06 13.1C3.75 13.1 3.47 13.22 3.25 13.44C3.03 13.66 2.92 13.95 2.92 14.26L2.92 15L7.71 15L7.71 14.01C7.6 13.49 7.13 13.1 6.59 13.1Z"/></svg>`,

  arrow_top_right: `<svg class="stat-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" aria-hidden="true"><path d="M11.74 10.63C12.29 10.63 12.75 10.17 12.75 9.62L12.75 3.26C12.75 2.71 12.29 2.25 11.74 2.25L5.38 2.25C4.83 2.25 4.37 2.71 4.37 3.26C4.37 3.81 4.83 4.26 5.38 4.26L9.27 4.32L2.55 11.04C2.16 11.43 2.16 12.06 2.55 12.45C2.94 12.84 3.58 12.84 3.96 12.45L10.68 5.73L10.74 9.62C10.74 10.17 11.19 10.63 11.74 10.63Z"/></svg>`,

  arrow_bottom_left: `<svg class="stat-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" aria-hidden="true"><path d="M3.26 4.37C2.71 4.37 2.26 4.83 2.26 5.38L2.26 11.74C2.26 12.29 2.71 12.75 3.26 12.75L9.62 12.75C10.17 12.75 10.63 12.29 10.63 11.74C10.63 11.19 10.17 10.74 9.62 10.74L5.73 10.68L12.45 3.96C12.84 3.57 12.84 2.94 12.45 2.55C12.06 2.16 11.43 2.16 11.04 2.55L4.32 9.27L4.26 5.38C4.26 4.83 3.81 4.37 3.26 4.37Z"/></svg>`,
};

// Returns the correct directional arrow SVG based on sign of a numeric value
function dirArrow(v) {
  if (v == null || isNaN(v)) return '';
  return v >= 0 ? SVG.arrow_top_right : SVG.arrow_bottom_left;
}

// ── Config ──────────────────────────────────────────────────────

const GEOJSON_PATH = 'data/neighborhoods.geojson';

// Variables available for choropleth mapping
const VAR_CONFIG = {
  med_hh_income:      { label: 'Median HH Income',     fmt: d => fmtDollar(d),   palette: 'blue'   },
  med_gross_rent:     { label: 'Median Gross Rent',     fmt: d => fmtDollar(d),   palette: 'blue'   },
  med_home_value:     { label: 'Median Home Value',     fmt: d => fmtDollar(d),   palette: 'purple' },
  pop_total:          { label: 'Total Population',      fmt: d => fmtNum(d),       palette: 'green'  },
  pct_renters:        { label: '% Renters',             fmt: d => fmtPct(d),       palette: 'orange' },
  pct_bachelors_plus: { label: '% Bachelor\'s+',        fmt: d => fmtPct(d),       palette: 'teal'   },
  pct_vacant:         { label: 'Vacancy Rate',          fmt: d => fmtPct(d),       palette: 'red'    },
  pop_change_pct:     { label: '5-yr Pop Change %',     fmt: d => fmtChg(d),       palette: 'div'    },
  income_change_pct:  { label: '5-yr Income Change %',  fmt: d => fmtChg(d),       palette: 'div'    },
};

// Color palettes (7 stops)
const PALETTES = {
  blue:   ['#dbeafe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e3a8a'],
  purple: ['#ede9fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#4c1d95'],
  green:  ['#d1fae5','#6ee7b7','#34d399','#10b981','#059669','#047857','#064e3b'],
  orange: ['#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#ea580c','#9a3412'],
  teal:   ['#ccfbf1','#99f6e4','#5eead4','#2dd4bf','#14b8a6','#0d9488','#134e4a'],
  red:    ['#fee2e2','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#7f1d1d'],
  // Diverging: green (low change) → white → red (high change)
  div:    ['#dc2626','#ef4444','#f87171','#e5e7eb','#86efac','#22c55e','#15803d'],
};

// ── Formatters ───────────────────────────────────────────────────

const fmt = (v, fallback = '—') => (v == null || isNaN(v)) ? fallback : v;

function fmtDollar(v) {
  if (v == null) return '—';
  return '$' + Math.round(v).toLocaleString();
}
function fmtNum(v) {
  if (v == null) return '—';
  return Math.round(v).toLocaleString();
}
function fmtPct(v) {
  if (v == null) return '—';
  return v.toFixed(1) + '%';
}
function fmtChg(v) {
  if (v == null) return '—';
  return (v >= 0 ? '+' : '') + v.toFixed(1) + '%';
}
function fmtPp(v) {
  if (v == null) return '—';
  return (v >= 0 ? '+' : '') + v.toFixed(1) + ' pp';
}
function fmtK(v) {
  if (v == null) return '—';
  return v >= 1000 ? '$' + (v / 1000).toFixed(0) + 'k' : '$' + Math.round(v);
}

// ── Map setup ────────────────────────────────────────────────────

const map = L.map('map', {
  center: [39.30, -76.62],
  zoom: 12,
  zoomControl: false,
  preferCanvas: true,
});

L.control.zoom({ position: 'topright' }).addTo(map);

// Dark basemap tile layer
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> | Census ACS 2019–2023',
    maxZoom: 19,
  }
).addTo(map);

// ── State ────────────────────────────────────────────────────────

let geojsonLayer = null;   // current Leaflet GeoJSON layer
let geojsonData  = null;   // raw GeoJSON object
let activeVar    = 'med_hh_income';
let selectedId   = null;   // currently selected OBJECTID
let charts       = {};     // Chart.js instances keyed by canvas id

// ── Colour scale ─────────────────────────────────────────────────

/**
 * Build a 7-bucket linear scale for a given variable across all features.
 * Returns { breaks, colors, getColor(value) }.
 */
function buildScale(features, varKey) {
  const cfg     = VAR_CONFIG[varKey];
  const palette = PALETTES[cfg.palette];
  const vals    = features
    .map(f => f.properties[varKey])
    .filter(v => v != null && !isNaN(v));

  if (!vals.length) {
    return { breaks: [], colors: palette, getColor: () => '#555' };
  }

  const n = palette.length;

  // Diverging: centre at 0
  if (cfg.palette === 'div') {
    const absMax = Math.max(Math.abs(Math.min(...vals)), Math.abs(Math.max(...vals)));
    const step   = (2 * absMax) / n;
    const breaks = Array.from({ length: n - 1 }, (_, i) => -absMax + step * (i + 1));
    return {
      breaks,
      colors: palette,
      getColor(v) {
        if (v == null) return '#333';
        for (let i = 0; i < breaks.length; i++) {
          if (v <= breaks[i]) return palette[i];
        }
        return palette[n - 1];
      },
    };
  }

  // Sequential: percentile-based breaks
  const sorted = [...vals].sort((a, b) => a - b);
  const q = p => sorted[Math.floor(p * sorted.length)] ?? sorted[sorted.length - 1];
  const breaks = [
    q(1 / 7), q(2 / 7), q(3 / 7), q(4 / 7), q(5 / 7), q(6 / 7),
  ];
  return {
    breaks,
    colors: palette,
    getColor(v) {
      if (v == null) return '#333';
      for (let i = 0; i < breaks.length; i++) {
        if (v <= breaks[i]) return palette[i];
      }
      return palette[n - 1];
    },
  };
}

// ── Render layer ─────────────────────────────────────────────────

function renderLayer(varKey) {
  if (geojsonLayer) map.removeLayer(geojsonLayer);

  const scale = buildScale(geojsonData.features, varKey);

  geojsonLayer = L.geoJSON(geojsonData, {
    style(feature) {
      const isSelected = feature.properties.OBJECTID === selectedId;
      return {
        fillColor:   scale.getColor(feature.properties[varKey]),
        fillOpacity: isSelected ? 0.95 : 0.72,
        color:       isSelected ? '#fff' : '#1a1d27',
        weight:      isSelected ? 2.5 : 1,
      };
    },

    onEachFeature(feature, layer) {
      const p = feature.properties;

      // ── Hover tooltip ──
      layer.bindTooltip(
        `<strong>${p.Name}</strong><br>` +
        `${VAR_CONFIG[varKey].label}: ${VAR_CONFIG[varKey].fmt(p[varKey])}`,
        { sticky: true, offset: [10, 0], className: '' }
      );

      layer.on({
        mouseover(e) {
          if (p.OBJECTID !== selectedId) {
            e.target.setStyle({ fillOpacity: 0.92, weight: 2, color: '#aaa' });
          }
        },
        mouseout(e) {
          if (p.OBJECTID !== selectedId) {
            geojsonLayer.resetStyle(e.target);
          }
        },
        click() { openPanel(p.OBJECTID); },
      });
    },
  }).addTo(map);

  renderLegend(scale, varKey);
}

// ── Legend ───────────────────────────────────────────────────────

function renderLegend(scale, varKey) {
  const cfg = VAR_CONFIG[varKey];
  const el  = document.getElementById('legend');

  let rows = '';

  // Build human-readable labels for each bucket
  const labels = buildLegendLabels(scale, cfg);
  labels.forEach(({ color, label }) => {
    rows += `
      <div class="legend-row">
        <div class="legend-swatch" style="background:${color}"></div>
        <span>${label}</span>
      </div>`;
  });

  el.innerHTML = `
    <div class="legend-title">${cfg.label}</div>
    ${rows}
    <div class="legend-row" style="margin-top:6px">
      <div class="legend-swatch" style="background:#333"></div>
      <span style="color:#8b90af">No data</span>
    </div>`;
}

function buildLegendLabels(scale, cfg) {
  if (!scale.breaks.length) {
    return scale.colors.map(c => ({ color: c, label: '—' }));
  }

  const fmt = cfg.fmt;
  const n   = scale.colors.length;
  const b   = scale.breaks;

  return scale.colors.map((color, i) => {
    let label;
    if (i === 0)         label = `< ${fmt(b[0])}`;
    else if (i === n - 1) label = `≥ ${fmt(b[b.length - 1])}`;
    else                  label = `${fmt(b[i - 1])} – ${fmt(b[i])}`;
    return { color, label };
  });
}

// ── Panel ────────────────────────────────────────────────────────

function openPanel(objectId) {
  selectedId = objectId;

  // Re-render layer to highlight selected polygon
  renderLayer(activeVar);

  const feat = geojsonData.features.find(f => f.properties.OBJECTID === objectId);
  if (!feat) return;

  populatePanel(feat.properties);

  document.body.classList.add('panel-open');
  map.invalidateSize();
}

function closePanel() {
  document.getElementById('panel').classList.remove('panel-open');
  document.body.classList.remove('panel-open');
  selectedId = null;
  renderLayer(activeVar);
  map.invalidateSize();
}

// ── Populate panel content ───────────────────────────────────────

function populatePanel(p) {
  // Name
  document.getElementById('panelName').textContent = p.Name;

  // Market signals as tags
  const sigEl = document.getElementById('panelSignals');
  if (p.market_signals) {
    const tags = p.market_signals.split(';').map(s => s.trim()).filter(Boolean);
    sigEl.innerHTML = tags.map(t => `<span class="signal-tag">${t}</span>`).join('');
  } else {
    sigEl.innerHTML = '';
  }

  // ── Top stats grid ──
  // icon: optional SVG to show above the label (pinhead.ink)
  // arrow: if true, append directional arrow to the value based on its sign
  const topStats = [
    {
      label: 'Population',
      value: fmtNum(p.pop_total),
      icon: SVG.crowd_of_people,
    },
    {
      label: 'Median Income',
      value: fmtDollar(p.med_hh_income),
    },
    {
      label: 'Median Rent',
      value: fmtDollar(p.med_gross_rent),
      icon: SVG.row_houses,
    },
    {
      label: '% Renters',
      value: fmtPct(p.pct_renters),
    },
    {
      label: '5-yr Pop Change',
      value: fmtChg(p.pop_change_pct),
      cls:   p.pop_change_pct >= 0 ? 'positive' : 'negative',
      icon:  SVG.crowd_of_people,
      arrow: p.pop_change_pct,
    },
    {
      label: '5-yr Income Change',
      value: fmtChg(p.income_change_pct),
      cls:   p.income_change_pct >= 0 ? 'positive' : 'negative',
      icon:  SVG.crowd_of_people,
      arrow: p.income_change_pct,
    },
  ];

  document.getElementById('topStats').innerHTML = topStats.map(s => `
    <div class="stat-cell">
      ${s.icon || ''}
      <div class="stat-label">${s.label}</div>
      <div class="stat-value ${s.cls || ''}">${s.value}${s.arrow != null ? dirArrow(s.arrow) : ''}</div>
    </div>`).join('');

  // ── Customer Base tab ──
  renderMetricRows('customerStats', [
    { label: '% Age 18–34',         value: p.pct_18_34,         max: 50, fmt: fmtPct },
    { label: '% Age 35–64',         value: p.pct_35_64,         max: 60, fmt: fmtPct },
    { label: '% Age 65+',           value: p.pct_65plus,        max: 40, fmt: fmtPct },
    { label: '% Bachelor\'s+',      value: p.pct_bachelors_plus,max: 100, fmt: fmtPct },
    { label: 'Avg Household Size',  value: p.avg_hh_size,       max: 4,  fmt: v => v?.toFixed(2) ?? '—' },
    { label: '% Work From Home',    value: p.pct_wfh,           max: 50, fmt: fmtPct },
    { label: 'Pop Density /km²',    value: p.pop_density_per_km2, max: 20000, fmt: v => fmtNum(v) },
    { label: '% Poverty',           value: p.pct_poverty,       max: 50, fmt: fmtPct },
  ]);

  renderChart('chartAge', {
    type: 'bar',
    label: 'Age Distribution',
    labels: ['18–34', '35–64', '65+'],
    data: [p.pct_18_34, p.pct_35_64, p.pct_65plus],
    color: '#4f8ef7',
  });

  renderChart('chartCommute', {
    type: 'bar',
    label: 'Commute Mode (%)',
    labels: ['Drive', 'Transit', 'Walk', 'WFH'],
    data: [p.pct_commute_drive, p.pct_commute_transit, p.pct_commute_walk, p.pct_wfh],
    color: '#7c5cbf',
  });

  // ── Housing & Market tab ──
  renderMetricRows('housingStats', [
    { label: 'Median Home Value',   value: p.med_home_value,      max: 600000, fmt: fmtDollar },
    { label: 'Median Gross Rent',   value: p.med_gross_rent,      max: 3000,   fmt: fmtDollar },
    { label: '% Owners',            value: p.pct_owners,          max: 100,    fmt: fmtPct },
    { label: '% Renters',           value: p.pct_renters,         max: 100,    fmt: fmtPct },
    { label: 'Vacancy Rate',        value: p.pct_vacant,          max: 30,     fmt: fmtPct },
    { label: '  Vacant — For Rent', value: p.pct_vacant_for_rent, max: 10,     fmt: fmtPct },
    { label: '  Vacant — For Sale', value: p.pct_vacant_for_sale, max: 10,     fmt: fmtPct },
    { label: '  Distressed Vacant', value: p.pct_vacant_distressed, max: 20,   fmt: fmtPct },
    { label: '% Units Pre-1950',    value: p.pct_pre1950,         max: 100,    fmt: fmtPct },
    { label: '% Income < $50k',     value: p.pct_hh_below50k,     max: 100,    fmt: fmtPct },
    { label: '% Income $50–100k',   value: p.pct_hh_50_100k,      max: 60,     fmt: fmtPct },
    { label: '% Income $100k+',     value: p.pct_hh_100k_plus,    max: 80,     fmt: fmtPct },
  ]);

  renderChart('chartTenure', {
    type: 'doughnut',
    label: 'Tenure Mix',
    labels: ['Owners', 'Renters'],
    data: [p.pct_owners, p.pct_renters],
    color: ['#34c47c', '#4f8ef7'],
  });

  renderChart('chartVacancy', {
    type: 'bar',
    label: 'Vacancy Type (%)',
    labels: ['For Rent', 'For Sale', 'Distressed'],
    data: [p.pct_vacant_for_rent, p.pct_vacant_for_sale, p.pct_vacant_distressed],
    color: ['#f0b429', '#e05c5c', '#8b5cf6'],
  });

  // ── Trends tab ──
  const trendRows = [
    {
      label: 'Pop Change (5yr)',
      value: p.pop_change_pct,
      max: 40, fmt: fmtChg, signed: true,
    },
    {
      label: '  vs City Avg',
      value: p.pop_change_pct_vs_city,
      max: 40, fmt: fmtPp, signed: true,
    },
    {
      label: 'Income Change (5yr)',
      value: p.income_change_pct,
      max: 60, fmt: fmtChg, signed: true,
    },
    {
      label: '  vs City Avg',
      value: p.income_change_pct_vs_city,
      max: 40, fmt: fmtPp, signed: true,
    },
    {
      label: 'Rent Change (5yr)',
      value: p.rent_change_pct,
      max: 60, fmt: fmtChg, signed: true,
    },
    {
      label: '  vs City Avg',
      value: p.rent_change_pct_vs_city,
      max: 30, fmt: fmtPp, signed: true,
    },
    {
      label: 'Home Value Change',
      value: p.home_value_change_pct,
      max: 80, fmt: fmtChg, signed: true,
    },
    {
      label: '  vs City Avg',
      value: p.home_value_change_pct_vs_city,
      max: 30, fmt: fmtPp, signed: true,
    },
    {
      label: 'Vacancy Change (pp)',
      value: p.vacancy_change_pp,
      max: 10, fmt: fmtPp, signed: true,
    },
    {
      label: 'Education Change (pp)',
      value: p.edu_change_pp,
      max: 20, fmt: fmtPp, signed: true,
    },
  ];
  renderMetricRows('trendStats', trendRows);

  renderChart('chartTrends', {
    type: 'bar',
    label: '5-Year Change vs City Avg (pp)',
    labels: ['Pop', 'Income', 'Rent', 'Home Val', 'Vacancy', 'Edu'],
    data: [
      p.pop_change_pct_vs_city,
      p.income_change_pct_vs_city,
      p.rent_change_pct_vs_city,
      p.home_value_change_pct_vs_city,
      p.vacancy_change_pp_vs_city,
      p.edu_change_pp_vs_city,
    ],
    diverging: true,
  });

  // Reset to first tab
  switchTab('customer');
}

// ── Metric rows helper ────────────────────────────────────────────

function renderMetricRows(containerId, metrics) {
  const el = document.getElementById(containerId);

  el.innerHTML = metrics.map(m => {
    const v        = m.value;
    const display  = m.fmt ? m.fmt(v) : (v == null ? '—' : v);
    const pct      = v == null ? 0 : Math.min(100, Math.abs(v) / m.max * 100);
    const barColor = m.signed
      ? (v >= 0 ? 'var(--green)' : 'var(--red)')
      : 'var(--accent)';

    return `
      <div class="metric-row">
        <span class="metric-label">${m.label}</span>
        <div class="metric-bar-wrap">
          <div class="metric-bar-fill" style="width:${pct}%;background:${barColor}"></div>
        </div>
        <span class="metric-value">${display}</span>
      </div>`;
  }).join('');
}

// ── Chart.js helper ───────────────────────────────────────────────

const CHART_DEFAULTS = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1d27',
      borderColor: '#2c3050',
      borderWidth: 1,
      titleColor: '#e8eaf6',
      bodyColor: '#8b90af',
      padding: 8,
    },
  },
  animation: { duration: 500, easing: 'easeOutQuart' },
};

function renderChart(canvasId, opts) {
  // Destroy existing instance
  if (charts[canvasId]) {
    charts[canvasId].destroy();
    delete charts[canvasId];
  }

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Insert title before canvas if not present
  let titleEl = canvas.previousElementSibling;
  if (!titleEl || !titleEl.classList.contains('chart-title')) {
    titleEl = document.createElement('div');
    titleEl.className = 'chart-title';
    canvas.parentNode.insertBefore(titleEl, canvas);
  }
  titleEl.textContent = opts.label;

  const data = opts.data.map(v => v ?? 0);

  if (opts.type === 'doughnut') {
    charts[canvasId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: opts.labels,
        datasets: [{
          data,
          backgroundColor: Array.isArray(opts.color) ? opts.color : [opts.color],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        ...CHART_DEFAULTS,
        cutout: '62%',
        plugins: {
          ...CHART_DEFAULTS.plugins,
          legend: {
            display: true,
            position: 'right',
            labels: { color: '#8b90af', font: { size: 11 }, boxWidth: 12 },
          },
        },
      },
    });
    return;
  }

  // Bar chart (standard or diverging)
  const colors = opts.diverging
    ? data.map(v => v >= 0 ? 'rgba(52,196,124,0.8)' : 'rgba(224,92,92,0.8)')
    : Array.isArray(opts.color)
      ? opts.color.map(c => c + 'cc')
      : Array(data.length).fill((opts.color || '#4f8ef7') + 'cc');

  charts[canvasId] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: opts.labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderRadius: 3,
        borderSkipped: false,
      }],
    },
    options: {
      ...CHART_DEFAULTS,
      indexAxis: 'x',
      scales: {
        x: {
          grid: { color: '#2c3050' },
          ticks: { color: '#8b90af', font: { size: 10 } },
        },
        y: {
          grid: { color: '#2c3050' },
          ticks: { color: '#8b90af', font: { size: 10 } },
          ...(opts.diverging && { suggestedMin: undefined }),
        },
      },
    },
  });
}

// ── Tab switching ─────────────────────────────────────────────────

function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === name);
  });
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${name}`);
  });
}

// ── Event listeners ───────────────────────────────────────────────

document.getElementById('panelClose').addEventListener('click', closePanel);

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.getElementById('varSelect').addEventListener('change', e => {
  activeVar = e.target.value;
  renderLayer(activeVar);
});

// ── Bootstrap ─────────────────────────────────────────────────────

fetch(GEOJSON_PATH)
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status} loading ${GEOJSON_PATH}`);
    return r.json();
  })
  .then(data => {
    geojsonData = data;
    renderLayer(activeVar);

    // Fit map to the neighborhood bounds
    const bounds = L.geoJSON(geojsonData).getBounds();
    map.fitBounds(bounds, { padding: [24, 24] });
  })
  .catch(err => {
    console.error('Failed to load GeoJSON:', err);
    alert(
      'Could not load neighborhoods.geojson.\n\n' +
      'If opening locally, run a local server:\n' +
      '  python3 -m http.server 8080\n' +
      'then visit http://localhost:8080'
    );
  });
