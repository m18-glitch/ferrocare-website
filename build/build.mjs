/* ==========================================================================
   Build — generates the static site into the project root.
   Run:  node build/build.mjs
   ========================================================================== */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  company, families, services, industries, differentiators, milestones, faqs,
  clients, proof, certifications,
} from "./data.mjs";
import {
  page, header, footer, logo, icons, artFor, art, productCard, ctaBand,
  pageHead, sectionHead, ratingPill, setNavProducts, shot, figure, gallery, asset, timeline,
  selector, isoGauge, ticker,
} from "./render.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Customer logo for the sliding strip. Drop a file named after the client
   (e.g. assets/img/clients/tata-motors.png / .svg / .webp / .jpg) and it is
   used automatically; otherwise the name is shown as a text wordmark. */
const CLIENT_DIR = join(ROOT, "assets", "img", "clients");
const clientSlug = (c) => c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const CLIENT_SECTOR = {
  "Tata Motors": "Automotive", "Maruti": "Automotive", "Bajaj Auto": "Automotive", "Ashok Leyland": "Automotive",
  "Mahindra": "Automotive", "TVS": "Automotive", "Hero Honda": "Automotive", "Motherson": "Auto components", "Lumax": "Auto components",
  "Tata Steel": "Steel", "Jindal": "Steel", "Essar": "Steel", "Bhushan Steel": "Steel", "Vizag Steel": "Steel", "SAIL plants": "Steel",
  "BHEL": "Power", "NTPC": "Power", "Tata Power": "Power", "NHPC": "Power", "Reliance Power": "Power",
  "ACC": "Cement", "L&T": "Engineering", "HAL": "Defence & aerospace", "DRDO": "Defence", "Ordnance Factories": "Defence",
  "Philips": "Electronics", "Godrej": "Manufacturing", "Videocon": "Electronics", "Whirlpool": "Appliances",
  "Nilkamal": "Plastics", "Supreme": "Plastics", "Cello": "Plastics", "Yuken": "Hydraulics", "Eaton Vickers": "Hydraulics",
  "Parker": "Hydraulics", "MOOG": "Motion control", "Ferromatic": "Plastics machinery", "BILT": "Paper",
  "NITCO": "Ceramics", "H&R Johnson": "Ceramics",
};
const SECTOR_TONE = { Steel: "copper", Power: "teal", Automotive: "blue", "Auto components": "blue", Defence: "green", "Defence & aerospace": "green", Hydraulics: "teal", Plastics: "violet" };
const initials = (c) => c.replace(/&/g, " ").split(/\s+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const clientLogo = (c) => {
  const slug = clientSlug(c);
  const ext = [".svg", ".png", ".webp", ".jpg"].find((e) => existsSync(join(CLIENT_DIR, slug + e)));
  return ext
    ? `<span class="client-logo"><img src="assets/img/clients/${slug}${ext}" alt="${c}" loading="lazy"></span>`
    : `<span class="client-logo client-logo--name">${c}</span>`;
};
setNavProducts(families);

const { contact, legal } = company;
const MODEL_COUNT = families.reduce((a, f) => a + f.models.length, 0);

/* Canonical origin for social scrapers and search engines. Override with
   SITE_ORIGIN when deploying somewhere else:  SITE_ORIGIN=https://x node build/build.mjs */
const FORM = company.form;
const SITE_ORIGIN = (process.env.SITE_ORIGIN || "https://saranyansaro.github.io/Ferrocare-Website").replace(/\/$/, "");
const canon = (file) => `${SITE_ORIGIN}/${file}`;

/* --------------------------------------------------------------------------
   "Find your machine" — two questions, mapped to the families that answer them.
   Keys are `${fluid}|${problem}`; the lookup is serialised into the page and
   resolved in the browser.
   -------------------------------------------------------------------------- */
const SELECTOR_FLUIDS = [
  { key: "hydraulic", label: "Hydraulic oil" },
  { key: "gear",      label: "Gear oil" },
  { key: "turbine",   label: "Turbine / lube oil" },
  { key: "frf",       label: "Phosphate ester / FRF" },
  { key: "coolant",   label: "Grinding coolant" },
];
const SELECTOR_PROBLEMS = [
  { key: "particles", label: "Fine particles / wear metal" },
  { key: "water",     label: "Water or moisture" },
  { key: "varnish",   label: "Sludge & varnish" },
  { key: "bulk",      label: "Heavy solid contamination" },
  { key: "unknown",   label: "Not sure — needs measuring" },
];

const FAM = Object.fromEntries(families.map((f) => [f.slug, f]));
const match = (slug, why, tags) => ({
  slug, why, tags,
  name: FAM[slug].short,
  img: FAM[slug].img ? `${FAM[slug].img.replace(/\.[a-z]+$/i, "")}.webp` : "",
  href: `product-${slug}.html`,
});

function selectorLookup() {
  const ELC = "electrostatic-liquid-cleaners", LVDH = "low-vacuum-dehydration", GB = "gearbox-oil-filtration",
        MAG = "magnetic-separator", TEST = "oil-test-equipment", EPT = "ept-machines";
  const g = {
    hydraulic: {
      particles: [match(ELC, "Sub-micron collection without disturbing the additive package — the standard answer for hydraulic systems running servo valves.", ["1 µ & below", "ELC series"])],
      water:     [match(LVDH, "Free and emulsified water removed under vacuum to 10–20 ppm, with no thermal stress on the oil.", ["10–20 ppm", "LVDH series"])],
      varnish:   [match(ELC, "Varnish and sludge are collected on the dielectric media — mechanical filters pass them straight through.", ["Varnish removal", "ELC series"])],
      bulk:      [match(MAG, "Rare-earth magnets pull out ferrous wear debris with no consumables, ahead of fine cleaning.", ["8× ferrite", "No consumables"]), match(ELC, "Then electrostatic cleaning takes the oil down to 1 micron.", ["1 µ & below"])],
      unknown:   [match(TEST, "Measure first. Particle counts and moisture readings decide whether the oil is cleaned or replaced.", ["ISO 4406", "OPCOM"])],
    },
    gear: {
      particles: [match(GB, "Couples directly to the gearbox housing and works the oil continuously — no dismantling required.", ["Direct coupling", "MS6 DHU"])],
      water:     [match(LVDH, "Handles up to 320 cSt and 20,000 ppm water — the heavy-viscosity specification is built for gear oils.", ["320 cSt", "20,000 ppm"])],
      varnish:   [match(GB, "Lifts carbonaceous sludge out of the sump rather than leaving it to recirculate through the bearings.", ["Carbon removal"])],
      bulk:      [match(GB, "Magnetic strainer plus mechanical filter, attached directly to the gearbox.", ["MS6 DHU"]), match(MAG, "Rare-earth magnetic separation for heavy ferrous loading.", ["Magnetix"])],
      unknown:   [match(TEST, "A particle count tells you more in ten minutes than a year of guesswork.", ["Particle count"])],
    },
    turbine: {
      particles: [match(ELC, "Keeps turbine lube oil in the superclean state the bearings need.", ["ELC series"])],
      water:     [match(LVDH, "Degassification models remove entrained gas as well as moisture — specified for turbine lube oil.", ["Degassification"])],
      varnish:   [match(ELC, "Varnish on valve spools is exactly what electrostatic collection was developed to remove.", ["Varnish removal"])],
      bulk:      [match(ELC, "Electrostatic cleaning for circulating lube systems.", ["1 µ & below"])],
      unknown:   [match(TEST, "Inline moisture sensing plus online particle counting to 400 bar.", ["400 bar"])],
    },
    frf: {
      particles: [match(EPT, "EPT Canada acid-control resins: acid number held below 0.2 mg KOH/g and resistivity restored.", ["Acid < 0.2", "EPT Canada"])],
      water:     [match(EPT, "Moisture held below 300–500 ppm in phosphate-ester and EHC fluids.", ["< 500 ppm", "EHC"])],
      varnish:   [match(EPT, "Acid control is what prevents the gels and servo-valve malfunction that plague FRF circuits.", ["Servo protection"])],
      bulk:      [match(EPT, "Particulate and insoluble gel removal alongside acid control.", ["Gel removal"])],
      unknown:   [match(EPT, "FRF needs acid number and resistivity testing, not just a particle count. We will tell you which.", ["Acid number"])],
    },
    coolant: {
      particles: [match(MAG, "Rare-earth separation keeps carbide and ferrous fines out of the cutting zone.", ["20–500 LPM", "Grinding & honing"])],
      water:     [match(MAG, "Fines removal extends coolant life and protects surface finish.", ["Fluid life"])],
      varnish:   [match(MAG, "Removing fines is what stops coolant degrading and leaving deposits.", ["Dry cake"])],
      bulk:      [match(MAG, "Magnetix discharges a dry cake and uses no filter consumables at all.", ["Magnetix", "8× ferrite"])],
      unknown:   [match(TEST, "Coolant condition is quick to measure — start there.", ["Assessment"])],
    },
  };
  for (const f of SELECTOR_FLUIDS)
    for (const p of SELECTOR_PROBLEMS)
      if (!g[f.key][p.key]) g[f.key][p.key] = g[f.key].unknown;
  return g;
}
const GROUP_LABEL = {
  oil: "Oil purification",
  filtration: "Filtration",
  coolant: "Process fluids",
  monitoring: "Oil testing",
  consumable: "Consumables & steels",
};

/* ============================== HOME ===================================== */
const home = () => {
  const body = `
<section class="hero">
  <div class="wrap hero__inner">
    <div class="hero__layout">
      <div>
        <div data-reveal>${ratingPill()}</div>
        <h1 data-reveal data-delay="1">We keep industrial oil <em>clean enough to trust.</em></h1>
        <p class="lead hero__lead" data-reveal data-delay="2">
          Ferrocare builds the machines that take contamination out of hydraulic, gear,
          turbine and lube oil — electrostatic cleaners that reach below one micron,
          vacuum dehydrators that pull water down to 10 ppm, and the instruments that
          prove it worked. Manufacturing in Pune since 1980.
        </p>
        <div class="btn-row hero__actions" data-reveal data-delay="3">
          <a class="btn btn--primary btn--lg" href="products.html">Explore the range ${icons.arrow}</a>
          <a class="btn btn--ghost btn--lg" href="contact.html">Talk to an engineer</a>
        </div>
        <div class="hero__trust" data-reveal data-delay="4">
          <div class="hero__trust-item"><strong>45+</strong><span>Years engineering oil</span></div>
          <div class="hero__trust-item"><strong>${families.length}</strong><span>Product lines</span></div>
          <div class="hero__trust-item"><strong>${MODEL_COUNT}</strong><span>Documented models</span></div>
          <div class="hero__trust-item"><strong>1 µ</strong><span>And below, electrostatically</span></div>
        </div>
      </div>

      <div class="hero__visual" data-reveal data-delay="2">
        <div class="hero__machine">
          <div class="hero__machine-glow"></div>
          <img src="assets/img/elc-machine.webp"
               alt="Ferrocare ELC electrostatic liquid cleaner on a trolley"
               width="554" height="669" fetchpriority="high" decoding="async">
        </div>
        <div class="float-card float-card--a">
          <div class="float-card__k">Cleanliness</div>
          <div class="float-card__v">ISO 18/16/13</div>
        </div>
        <div class="float-card float-card--b">
          <div class="float-card__k">Final water</div>
          <div class="float-card__v">10 <small>ppm</small></div>
        </div>
        <div class="float-card float-card--c">
          <div class="float-card__k">Collection</div>
          <div class="float-card__v">1 µ <small>&amp; below</small></div>
        </div>
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          ELC Series · Electrostatic Liquid Cleaner
        </div>
      </div>
    </div>
  </div>
</section>

<!-- clients -->
<section class="clients-strip" aria-label="Our customers">
  <div class="logo-slider">
    <div class="logo-slider__track">
      ${[0, 1].map((i) => `<div class="logo-slider__group"${i ? ' aria-hidden="true"' : ""}>${clients.map(clientLogo).join("")}</div>`).join("")}
    </div>
  </div>
</section>

<!-- ============ what clean oil actually means ============ -->
<section class="section">
  <div class="wrap split">
    <div data-reveal>
      <span class="eyebrow">Cleanliness, measured</span>
      <h2 class="mt-4">What "clean" actually means in numbers</h2>
      <p class="lead mt-5">
        Oil cleanliness is reported as an ISO 4406 code — three numbers counting
        particles above 4, 6 and 14 microns per millilitre. Lower is cleaner. A
        hydraulic system running servo valves wants to be in the mid-teens; untreated
        oil sits in the low twenties.
      </p>
      <p class="lead mt-5">
        Mechanical filtration gets you part of the way. Electrostatic collection,
        which reaches below one micron and also lifts sludge and varnish, is what
        closes the gap to a code the valves can live with. Watch the needle.
      </p>
      <ul class="checks mt-6">
        ${[
          "ISO 4406 reported directly by OPCOM counters — no lab turnaround",
          "Electrostatic collection to 1 micron and below",
          "Sludge and varnish removed, which a particle count cannot see",
          "Cleanliness codes logged over time to show the trend, not a snapshot",
        ].map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("")}
      </ul>
      <div class="btn-row mt-7">
        <a class="btn btn--primary" href="product-oil-test-equipment.html">Oil test equipment ${icons.arrow}</a>
      </div>
    </div>
    <div data-reveal data-delay="2">
      ${isoGauge()}
    </div>
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: "Ferrocare Machines Pvt. Ltd. — Oil Filtration, Electrostatic Cleaning & Dehydration | Pune",
    description:
      "Ferrocare Machines Private Limited, Pune — manufacturer and exporter of electrostatic liquid cleaners, low vacuum dehydration machines, hydraulic oil filtration systems, coolant filtration and condition monitoring instruments since 1980.",
    current: "index.html",
    canonical: canon("index.html"),
    body,
  });
};

/* ============================== PRODUCTS ================================= */
const products = () => {
  const body = `
${pageHead({
  eyebrow: "Products",
  title: "Our Products",
  lead: "Machines and instruments that keep industrial oil clean — from electrostatic cleaning and vacuum dehydration to magnetic separation and oil testing.",
  crumbs: [{ label: "Products" }],
})}

<div class="filterbar">
  <div class="wrap filterbar__row">
    <div class="filters" role="group" aria-label="Filter products">
      <button class="filter is-active" data-filter="all">All products</button>
      <button class="filter" data-filter="oil">Oil purification</button>
      <button class="filter" data-filter="filtration">Filtration</button>
      <button class="filter" data-filter="monitoring">Oil testing</button>
    </div>
    <div class="search">
      ${icons.search}
      <input type="search" id="productSearch" placeholder="Search models, e.g. ELC 100, LVDH" aria-label="Search products">
    </div>
  </div>
</div>

<section class="section section--tight">
  <div class="wrap">
    <p class="result-count mb-6" id="resultCount">Showing ${families.length} products · ${families.reduce((a, f) => a + f.models.length, 0)} models</p>
    <div class="grid grid--products" id="productGrid" data-total-models="${families.reduce((a, f) => a + f.models.length, 0)}">
      ${families.map((f) => `
        <div class="pcard-wrap" data-family="${f.group}" data-search="${(f.name + " " + f.series + " " + f.models.map((m) => m.name + " " + Object.values(m.specs).join(" ")).join(" ")).toLowerCase().replace(/"/g, "")}">
          ${productCard(f)}
        </div>`).join("")}
    </div>
    <p class="center muted mt-8 is-hidden" id="noResults">No families match that search. Try a model number such as <span class="mono">ELC 100</span>, <span class="mono">LVDH 600</span> or <span class="mono">OPCOM</span>.</p>
  </div>
</section>

<!-- ============ find your machine ============ -->
<section class="section" id="find">
  <div class="wrap wrap--narrow">
    ${sectionHead({
      eyebrow: "Sizing tool",
      title: "Find your machine in two questions",
      lead: "Pick the fluid you run and the contamination you are seeing. This is the short version of how a Ferrocare engineer narrows the range — the real sizing happens against your duty point.",
      center: true,
    })}
    <div class="mt-8" data-reveal>
      ${selector(SELECTOR_FLUIDS, SELECTOR_PROBLEMS, selectorLookup())}
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Quotation",
  title: "Not sure which product fits?",
  body: "Tell us your oil type, reservoir volume and the problem you are seeing. Our engineers will recommend the right machine.",
})}
`;
  return page({
    title: "Products — Oil Filtration, Electrostatic Cleaners, Dehydration & Monitoring | Ferrocare",
    description:
      "Ferrocare products: electrostatic liquid cleaners (ELC), low vacuum dehydration machines (LVDH), gear box oil filtration, Magnetix magnetic separators, oil test equipment and EPT machines for fire-resistant fluids.",
    current: "products.html",
    canonical: canon("products.html"),
    body,
  });
};

/* =========================== PRODUCT DETAIL ============================== */

/* ---------- line icons for the product "layout" pages ---------- */
const LI = (d) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const PICON = {
  drop: LI(`<path d="M24 6 C24 6 12 22 12 30a12 12 0 0 0 24 0C36 22 24 6 24 6Z" fill="currentColor" stroke="none"/>`),
  ban: LI(`<circle cx="24" cy="24" r="16"/><path d="m13 13 22 22"/>`),
  clock: LI(`<circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 5"/>`),
  rupee: LI(`<circle cx="24" cy="24" r="16"/><path d="M18 16h12M18 21h12M18 16h3a5 5 0 0 1 0 10h-3l9 8"/>`),
  volume: LI(`<path d="M24 8l-5 8a5 5 0 1 0 10 0Z"/><path d="M10 28a14 10 0 0 0 28 0"/>`),
  viscosity: LI(`<path d="M24 6 14 22a10 10 0 1 0 20 0Z"/><path d="M19 27h10M19 31h10"/>`),
  gear: LI(`<circle cx="24" cy="24" r="5"/><path d="M24 8v5M24 35v5M8 24h5M35 24h5M12.7 12.7l3.5 3.5M31.8 31.8l3.5 3.5M12.7 35.3l3.5-3.5M31.8 16.2l3.5-3.5"/><circle cx="24" cy="24" r="11"/>`),
  servo: LI(`<circle cx="24" cy="24" r="4" fill="currentColor"/><circle cx="24" cy="24" r="9"/><path d="M24 7v6M24 35v6M7 24h6M35 24h6M12 12l4 4M32 32l4 4M12 36l4-4M32 16l4-4"/>`),
  proportional: LI(`<path d="M24 8v32M10 24h28M18 8h12"/><path d="m24 18 6 6-6 6-6-6Z"/>`),
  check: LI(`<circle cx="24" cy="24" r="16"/><path d="m16 24 6 6 11-12"/>`),
  trend: LI(`<circle cx="24" cy="24" r="16"/><path d="M16 32v-5M21 32v-8M26 32v-6M31 32v-10M15 22l7-6 5 4 7-7M30 13h4v4"/>`),
  funnel: LI(`<path d="M8 12h32L28 26v12l-8 -4v-8Z"/>`),
  gauge: LI(`<path d="M8 32a16 16 0 0 1 32 0"/><path d="m24 32 7-9"/><circle cx="24" cy="32" r="2" fill="currentColor"/>`),
  dirty: LI(`<circle cx="24" cy="24" r="20"/><circle cx="17" cy="19" r="1.4"/><circle cx="25" cy="16" r="1.4"/><circle cx="29" cy="24" r="1.4"/><circle cx="20" cy="28" r="1.4"/><circle cx="31" cy="30" r="1.4"/><circle cx="23" cy="22" r="1"/>`),
  charge: LI(`<circle cx="24" cy="24" r="20"/><path d="M16 14v20M19 14v20M22 14v20M25 14v20M12 13h4M14 11v4"/><circle cx="32" cy="17" r="2"/><circle cx="32" cy="24" r="2"/><circle cx="32" cy="31" r="2"/>`),
  magnet: LI(`<path d="M14 10v14a10 10 0 0 0 20 0V10h-7v14a3 3 0 0 1-6 0V10Z"/><path d="M14 16h7M27 16h7"/><path d="M36 6l2-3M39 10l3-1M10 6 8 3M7 10 4 9"/>`),
  waves: LI(`<circle cx="24" cy="24" r="18"/><path d="M14 19c3-2 4-2 6 0s3 2 6 0 4-2 6 0M14 25c3-2 4-2 6 0s3 2 6 0 4-2 6 0M14 31c3-2 4-2 6 0s3 2 6 0 4-2 6 0"/>`),
  target: LI(`<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="3" fill="currentColor"/>`),
  dots: LI(`<circle cx="24" cy="24" r="17"/><circle cx="24" cy="15" r="2" fill="currentColor"/><circle cx="17" cy="20" r="2" fill="currentColor"/><circle cx="31" cy="20" r="2" fill="currentColor"/><circle cx="24" cy="24" r="2" fill="currentColor"/><circle cx="18" cy="29" r="2" fill="currentColor"/><circle cx="30" cy="29" r="2" fill="currentColor"/><circle cx="24" cy="33" r="2" fill="currentColor"/>`),
  bubbles: LI(`<circle cx="20" cy="20" r="8"/><circle cx="31" cy="30" r="5"/><circle cx="17" cy="35" r="2.5"/>`),
  touch: LI(`<path d="M16 16a11 11 0 0 1 16 0M12 12a16 16 0 0 1 24 0"/><rect x="18" y="22" width="12" height="18" rx="6"/><path d="M24 26v4"/>`),
  flask: LI(`<path d="M19 6h10M21 6v12L10 38a3 3 0 0 0 3 4h22a3 3 0 0 0 3-4L27 18V6"/><path d="M15 30h18"/>`),
  nofire: LI(`<path d="M24 8c3 6 9 9 9 17a9 9 0 0 1-18 0c0-5 3-8 4-11 2 3 3 4 5 5 0-4-1-7 0-11Z"/><path d="m10 10 28 28"/>`),
  therm: LI(`<path d="M21 8a3 3 0 0 1 6 0v18a8 8 0 1 1-6 0Z"/><path d="M24 20v10"/><circle cx="24" cy="33" r="3" fill="currentColor"/><path d="M32 12h5M32 17h3"/>`),
  shield: LI(`<path d="M24 6 38 11v11c0 9-6 16-14 20-8-4-14-11-14-20V11Z"/><path d="m18 24 5 5 8-9"/>`),
  oil: LI(`<path d="M24 8 15 22a9 9 0 1 0 18 0Z"/><path d="M20 26a4 4 0 0 0 4 4"/>`),
  clean: LI(`<circle cx="24" cy="24" r="20"/><path d="M24 11l-7 11a7 7 0 1 0 14 0Z"/>`),
};

const productLayout = (f, L) => `
<section class="phero">
  <div class="wrap phero__grid">
    <div class="phero__text" data-reveal>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="products.html">Products</a><span>/</span><span>${f.short}</span></nav>
      <span class="eyebrow">${L.label}</span>
      <h1 class="mt-4">${L.heading || f.name}</h1>
      ${L.intro.map((p, i) => `<p class="lead mt-${i ? 4 : 5}">${p}</p>`).join("")}
      <div class="btn-row mt-7">
        ${L.catalogue ? `<a class="btn btn--primary btn--lg" href="${L.catalogue}" target="_blank" rel="noopener">${L.catalogueLabel || "Download Catalogue"} ${icons.arrow}</a>` : ""}
      </div>
    </div>
    <div class="viewer${L.wide ? " viewer--wide" : ""}${L.photoCard ? " viewer--card" : ""}" data-reveal data-delay="2">
      <div class="viewer__stage">
        <div class="viewer__glow" aria-hidden="true"></div>
        ${L.views.map((v, i) => `<img class="viewer__img${i ? "" : " is-on"}" data-view="${i}" src="assets/img/${v.img}" alt="${f.name} — ${v.caption}" decoding="async">`).join("")}
        ${(L.badges || []).map((b, i) => `<div class="float-card viewer__badge viewer__badge--${"ab"[i]}"><div class="float-card__k">${b.k}</div><div class="float-card__v">${b.v}</div></div>`).join("")}
      </div>
      ${L.views.length > 1 ? `<div class="viewer__tabs" role="tablist" aria-label="Product views">
        ${L.views.map((v, i) => `<button class="viewer__tab${i ? "" : " is-on"}" role="tab" aria-selected="${!i}" data-view="${i}">${v.caption}</button>`).join("")}
      </div>` : ""}
    </div>
  </div>
</section>

${L.keyStats ? `<section class="section section--tight kstats-band">
  <div class="wrap">
    <div class="kstats kstats--${L.keyStats.length}">
      ${L.keyStats.map((k, i) => `
      <div class="kcard" data-reveal data-delay="${i % 4}">
        <span class="kcard__ico">${PICON[k.icon]}</span>
        <div>${k.title ? `<strong>${k.title}</strong><span>${k.text}</span>` : `<strong class="kcard__solo">${k.text}</strong>`}</div>
      </div>`).join("")}
    </div>
  </div>
</section>` : ""}
${L.features ? `
<section class="section kstats-band">
  <div class="wrap">
    ${sectionHead({ title: "Features" })}
    <div class="feats mt-8">
      ${L.features.map((ft, i) => `
      <div class="feat" data-reveal data-delay="${i % 4}">
        <span class="feat__num">${String(i + 1).padStart(2, "0")}</span>
        <span class="feat__ico">${PICON[ft.icon]}</span>
        <p>${ft.text}</p>
      </div>`).join("")}
    </div>
  </div>
</section>` : ""}

${L.criteria ? `<section class="section">
  <div class="wrap">
    ${sectionHead({ title: "Model selection criteria depends on", center: true })}
    <div class="crit mt-8">
      ${L.criteria.map((c, i) => `
      <div class="crit__item" data-reveal data-delay="${i % 4}">
        <span class="crit__num">${String(i + 1).padStart(2, "0")}</span>
        <span class="crit__ico">${PICON[c.icon]}</span>
        <strong>${c.text}</strong>
      </div>`).join("")}
    </div>
  </div>
</section>

` : ""}
${L.how ? `<section class="section how" id="technology">
  <div class="wrap how__grid">
    <div data-reveal>
      <h2>How it works</h2>
      <p class="lead mt-5">${L.how}</p>
    </div>
    <div class="flow2" data-reveal data-delay="2">
      <div class="flow2__line" aria-hidden="true"><span></span></div>
      ${L.steps.map((st, i) => `
      <div class="flow2__step flow2__step--${i}">
        <span class="flow2__ring"><span class="flow2__ico">${PICON[st.icon]}</span></span>
        <strong>${st.title}</strong>
        <small>${st.sub}</small>
      </div>`).join("")}
    </div>
  </div>
</section>

` : ""}
${L.about ? `
<section class="section how">
  <div class="wrap how__grid">
    <div data-reveal>
      <h2>${L.about.title}</h2>
      ${L.about.paras.map((p, i) => `<p class="lead mt-${i ? 4 : 5}">${p}</p>`).join("")}
    </div>
    ${L.applications ? `
    <div class="apps" data-reveal data-delay="2">
      <h3 class="apps__title">Applications</h3>
      <ul class="apps__list">
        ${L.applications.map((a, i) => `<li style="--i:${i}"><span class="apps__ico">${PICON.oil}</span>${a}</li>`).join("")}
      </ul>
    </div>` : ""}
  </div>
</section>` : ""}
${L.keyFeatures ? `
<section class="section">
  <div class="wrap kf">
    <div data-reveal>
      ${sectionHead({ title: "Key features" })}
      <ul class="kf__list mt-6">
        ${L.keyFeatures.map((k) => `<li><span class="kf__tick">${icons.check}</span><span>${k}</span></li>`).join("")}
      </ul>
    </div>
    ${L.criteriaNote ? `
    <aside class="kf__note" data-reveal data-delay="2">
      <span class="kf__note-ico">${PICON.gear}</span>
      <h3>Model selection criteria depends on</h3>
      <p>${L.criteriaNote}</p>
    </aside>` : ""}
  </div>
</section>` : ""}
${L.extra ? `
<section class="section kstats-band">
  <div class="wrap extra">
    <div data-reveal>
      <h2>${L.extra.title}</h2>
      ${L.extra.paras.map((p, i) => `<p class="lead mt-${i ? 4 : 5}">${p}</p>`).join("")}
    </div>
    <div class="extra__media" data-reveal data-delay="2">
      <div class="extra__glow" aria-hidden="true"></div>
      <img src="assets/img/${L.extra.img}" alt="${L.extra.title}" loading="lazy" decoding="async">
    </div>
  </div>
</section>` : ""}
${L.solutions ? `
<section class="section">
  <div class="wrap">
    ${sectionHead({ title: "Solutions by fluid", center: true })}
    <div class="sols mt-8">
      ${L.solutions.map((so, i) => `
      <article class="sol" data-reveal data-delay="${i % 4}">
        <span class="sol__num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${so.name}</h3>
        <p>${so.text}</p>
        <div class="sol__chips">${so.systems.map((x) => `<span>${x}</span>`).join("")}</div>
      </article>`).join("")}
    </div>
  </div>
</section>` : ""}
${L.systems ? `
<section class="section kstats-band">
  <div class="wrap">
    ${sectionHead({ title: "The systems", center: true })}
    <div class="feats mt-8">
      ${L.systems.map((sy, i) => `
      <div class="feat" data-reveal data-delay="${i % 4}">
        <span class="feat__ico sys__badge">${sy.name.replace(/®|₂/g, "").trim().split(" ")[0]}</span>
        <div><h3 class="sys__name">${sy.name}</h3><p>${sy.text}</p></div>
      </div>`).join("")}
    </div>
  </div>
</section>` : ""}
${!L.about && (L.applications || L.flowRange) ? `
<section class="section">
  <div class="wrap apps-grid">
    ${L.applications ? `
    <div class="apps" data-reveal>
      <h3 class="apps__title">Applications</h3>
      <ul class="apps__list">
        ${L.applications.map((a) => `<li><span class="apps__ico">${PICON.check}</span>${a}</li>`).join("")}
      </ul>
    </div>` : ""}
    ${L.flowRange ? `
    <div class="apps flowr" data-reveal data-delay="2">
      <h3 class="apps__title">Flow range</h3>
      <div class="flowr__body">
        <span class="flowr__ico">${PICON.waves}</span>
        <div><span class="flowr__k">${L.flowRange.label}</span><strong class="flowr__v">${L.flowRange.value}</strong></div>
      </div>
      <p class="flowr__note">${L.flowRange.note}</p>
      ${L.catalogue ? `<a class="btn btn--primary mt-6" href="${L.catalogue}" target="_blank" rel="noopener">${L.catalogueLabel || "Download Catalogue"} ${icons.arrow}</a>` : ""}
    </div>` : ""}
  </div>
</section>` : ""}
${L.benefits ? `<section class="section">
  <div class="wrap">
    ${sectionHead({ title: "Key benefits", center: true })}
    <div class="bens mt-8">
      ${L.benefits.map((b, i) => `
      <div class="ben" data-reveal data-delay="${i % 4}">
        <span class="ben__ico">${PICON[b.icon]}</span>
        <span class="ben__txt">${b.text}</span>
      </div>`).join("")}
    </div>
  </div>
</section>

` : ""}
<script>
(function(){
  var tabs=document.querySelectorAll('.viewer__tab'), imgs=document.querySelectorAll('.viewer__img');
  var cur=0, timer;
  function show(n){cur=n;tabs.forEach(function(t){var on=+t.dataset.view===n;t.classList.toggle('is-on',on);t.setAttribute('aria-selected',on);});
    imgs.forEach(function(im){im.classList.toggle('is-on',+im.dataset.view===n);});}
  tabs.forEach(function(t){t.addEventListener('click',function(){clearInterval(timer);show(+t.dataset.view);});});
  if(imgs.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){timer=setInterval(function(){show((cur+1)%imgs.length);},4000);}
})();
</script>
`;


const productTabs = (f, L) => `
<section class="phero phero--tabs">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="products.html">Products</a><span>/</span><span>${f.short}</span></nav>
    <h1 data-reveal>${f.name}</h1>
    <div class="ptabs" role="tablist" aria-label="${f.name}" data-reveal data-delay="1">
      ${L.tabs.map((t, i) => `<button class="ptabs__btn${i ? "" : " is-on"}" role="tab" id="tab-${t.key}" aria-controls="panel-${t.key}" aria-selected="${!i}" data-tab="${t.key}"><span class="ptabs__thumb"><img src="assets/img/${t.img}" alt=""></span>${t.name}</button>`).join("")}
    </div>
  </div>
</section>

${L.tabs.map((t, i) => `
<div class="ptab-panel${i ? "" : " is-on"}" id="panel-${t.key}" role="tabpanel" aria-labelledby="tab-${t.key}">
  <section class="section section--tight">
    <div class="wrap phero__grid">
      <div class="phero__text">
        <h2 class="ptab-panel__title">${t.name}</h2>
        ${t.intro.map((p, j) => `<p class="lead mt-${j ? 4 : 5}">${p}</p>`).join("")}
      </div>
      <div class="pgal pgal--white" data-gal>
        <div class="pgal__main">
          ${(t.images || [{ img: t.img, caption: t.name }]).map((im, j) => `<img class="pgal__img${j ? "" : " is-on"}" data-i="${j}" src="assets/img/${im.img}" alt="${t.name} — ${im.caption}" decoding="async">`).join("")}
        </div>
        ${t.images && t.images.length > 1 ? `<div class="pgal__thumbs">
          ${t.images.map((im, j) => `<button class="pgal__thumb${j ? "" : " is-on"}" data-i="${j}" aria-label="${im.caption}"><img src="assets/img/${im.img}" alt=""></button>`).join("")}
        </div>` : ""}
      </div>
    </div>
  </section>
  ${t.keyStats ? `
  <section class="section section--tight kstats-band">
    <div class="wrap">
      <div class="kstats kstats--${t.keyStats.length}">
        ${t.keyStats.map((k) => `<div class="kcard"><span class="kcard__ico">${PICON[k.icon]}</span><div><strong class="kcard__solo">${k.text}</strong></div></div>`).join("")}
      </div>
    </div>
  </section>` : ""}
  ${t.keyFeatures ? `
  <section class="section">
    <div class="wrap kf">
      <div>
        ${sectionHead({ title: "Key features" })}
        <ul class="kf__list mt-6">
          ${t.keyFeatures.map((k) => `<li><span class="kf__tick">${icons.check}</span><span>${k}</span></li>`).join("")}
        </ul>
      </div>
      ${t.criteriaNote ? `
      <aside class="kf__note">
        <span class="kf__note-ico">${PICON.gear}</span>
        <h3>Model selection criteria depends on</h3>
        <p>${t.criteriaNote}</p>
      </aside>` : ""}
    </div>
  </section>` : ""}
</div>`).join("")}

<script>
(function(){
  var btns=[].slice.call(document.querySelectorAll('.ptabs__btn')), panels=[].slice.call(document.querySelectorAll('.ptab-panel'));
  document.documentElement.classList.add('has-tabs');
  function show(key, scroll){
    btns.forEach(function(b){var on=b.dataset.tab===key;b.classList.toggle('is-on',on);b.setAttribute('aria-selected',on);});
    panels.forEach(function(p){var on=p.id==='panel-'+key;p.classList.toggle('is-on',on);
      if(on){p.classList.remove('is-anim');void p.offsetWidth;p.classList.add('is-anim');}});
    if(history.replaceState) history.replaceState(null,'','#'+key);
  }
  btns.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.tab);});});
  var h=location.hash.slice(1); if(h && document.getElementById('panel-'+h)) show(h);
  document.querySelectorAll('[data-gal]').forEach(function(g){
    var imgs=g.querySelectorAll('.pgal__img'), th=g.querySelectorAll('.pgal__thumb'), cur=0, t;
    function go(n){cur=n;imgs.forEach(function(x){x.classList.toggle('is-on',+x.dataset.i===n);});th.forEach(function(x){x.classList.toggle('is-on',+x.dataset.i===n);});}
    th.forEach(function(b){b.addEventListener('click',function(){clearInterval(t);go(+b.dataset.i);});});
    if(imgs.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) t=setInterval(function(){go((cur+1)%imgs.length);},3500);
  });
})();
</script>
`;

const productDetail = (f, idx) => {
  const prev = families[(idx - 1 + families.length) % families.length];
  const next = families[(idx + 1) % families.length];

  const body = `
<div class="readbar" aria-hidden="true"><div class="readbar__fill" id="readFill"></div></div>

${f.layout ? (f.layout.tabs ? productTabs(f, f.layout) : productLayout(f, f.layout)) : `${pageHead({
  eyebrow: `${f.series} · ${GROUP_LABEL[f.group]}`,
  title: f.name,
  lead: f.summary,
  crumbs: [{ label: "Products", href: "products.html" }, { label: f.short }],
})}

<nav class="subnav" aria-label="On this page">
  <div class="wrap subnav__row">
    <span class="subnav__label">${f.series}</span>
    <a class="subnav__link" href="#overview">Overview</a>
    ${f.gallery ? `<a class="subnav__link" href="#gallery">Gallery</a>` : ""}
    <a class="subnav__link" href="#technology">Technology</a>
    <a class="subnav__link" href="#models">Models &amp; specifications</a>
    <a class="subnav__link" href="#applications">Applications</a>
    <a class="btn btn--primary btn--sm subnav__cta" href="contact.html?product=${encodeURIComponent(f.name)}">Enquire ${icons.arrow}</a>
  </div>
</nav>

<section class="section" id="overview">
  <div class="wrap split">
    <div data-reveal>
      <span class="eyebrow">At a glance</span>
      <h2 class="mt-4" style="font-size:var(--t-h3)">${f.tagline}</h2>
      <ul class="checks mt-6">
        ${f.highlights.map((h) => `<li>${icons.check}<span>${h}</span></li>`).join("")}
      </ul>
      ${f.limits ? `
        <div class="note mt-6">
          ${icons.shield}
          <div>
            <strong>Operating limits.</strong> ${f.limits.join(" · ")}
          </div>
        </div>` : ""}
      <div class="btn-row mt-7">
        <a class="btn btn--primary" href="contact.html?product=${encodeURIComponent(f.name)}">Request a quotation ${icons.arrow}</a>
        <a class="btn btn--ghost" href="services.html">Related services</a>
      </div>
    </div>
    <div data-reveal data-delay="2">
      ${f.img
        ? `<div class="shot">${`<img src="assets/img/${asset(f.img)}" alt="${f.name} — Ferrocare ${f.series}" loading="lazy" decoding="async">`}</div>`
        : `<div class="split__media">${artFor(f.art)}</div>`}
    </div>
  </div>
</section>

${f.gallery ? `
<section class="section section--tight">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Gallery", title: `${f.short} in detail`, lead: "Photographs of the equipment, its internal assemblies and installations in service." })}
    <div class="mt-8" data-reveal>
      ${gallery(f.gallery)}
    </div>
  </div>
</section>` : ""}

<section class="section" id="technology">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Technology", title: "How it works" })}
    <div class="split mt-8">
      <div data-reveal>
        <p class="lead">${f.technology}</p>
      </div>
      <div data-reveal data-delay="2">
        <div class="card" style="padding:var(--s-6)">
          <h4 style="font-family:var(--font-mono);font-size:var(--t-micro);letter-spacing:.14em;text-transform:uppercase;color:var(--fg-subtle);font-weight:500">Family summary</h4>
          <table class="spec-table mt-4">
            <tbody>
              <tr><th>Series</th><td>${f.series}</td></tr>
              <tr><th>Discipline</th><td>${GROUP_LABEL[f.group]}</td></tr>
              <tr><th>Models available</th><td>${f.models.length}</td></tr>
              <tr><th>Origin</th><td>Made in India — Pune, Maharashtra</td></tr>
              <tr><th>Business type</th><td>${legal.nature}</td></tr>
              <tr><th>Customisation</th><td>Engineered per application</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

`}

${f.layout ? "" : `
<section class="section" id="models">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Models & specifications",
      title: `${f.models.length} configuration${f.models.length > 1 ? "s" : ""} in the ${f.series} range`,
      lead: "Figures below are the published specifications for each model. Where a duty falls outside these, the unit is engineered to the application rather than selected from the range.",
    })}
    <div class="grid grid--2 mt-8">
      ${f.models.map((m, i) => `
        <article class="card" data-reveal data-delay="${(i % 2) + 1}">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-4)">
            <h3 style="font-size:1.15rem">${m.name}</h3>
            <span class="chip chip--copper">${String(i + 1).padStart(2, "0")}</span>
          </div>
          <p class="mt-4">${m.note}</p>
          <table class="spec-table mt-5">
            <tbody>
              ${Object.entries(m.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
            </tbody>
          </table>
          <div class="card__foot">
            <span class="card__tag">${f.series}</span>
            <a class="link-arrow" href="contact.html?product=${encodeURIComponent(m.name)}">Enquire ${icons.arrow}</a>
          </div>
        </article>`).join("")}
    </div>
    ${f.selectionGuide ? `
    <div class="mt-9" data-reveal>
      <div class="section-head mb-6" style="max-width:none">
        <span class="eyebrow">Sizing</span>
        <h3 class="mt-4" style="font-size:var(--t-h3)">${f.selectionGuide.caption}</h3>
        <p class="lead mt-4">
          The same machine maintains far less oil as viscosity rises, because a heavier
          fluid is harder to move through the collector. Sizing off the wrong column is
          the most common specification error in this category — so here is the whole
          table.
        </p>
      </div>
      <div class="table-scroll">
        <table class="spec-table spec-table--grid">
          <thead>
            <tr>${f.selectionGuide.columns.map((c, i) => `<th scope="col" class="${i > 0 && i < 5 ? "num" : ""}">${c}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${f.selectionGuide.rows.map((r) => `<tr>${r.map((cell, i) => i === 0
              ? `<th scope="row" class="rowhead">${cell}</th>`
              : `<td class="${i > 0 && i < 5 ? "num" : ""}">${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="note mt-6">
        ${icons.shield}
        <div>${f.selectionGuide.note}</div>
      </div>
    </div>` : ""}

    <div class="note note--teal mt-8" data-reveal>
      ${icons.file}
      <div>Specifications are as published in Ferrocare's product literature. Because most units are built to order, confirm the final figures against your duty point at the time of enquiry — flow rate, viscosity, water load and fluid chemistry all influence the delivered configuration.</div>
    </div>
  </div>
</section>

<section class="section" id="applications">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Where it is used", title: "Applications and industries" })}
    <div class="grid grid--3 mt-8">
      ${industries.slice(0, 6).map((ind, i) => `
        <div class="card" data-reveal data-delay="${(i % 3) + 1}">
          <h3 style="font-size:1.05rem">${ind.name}</h3>
          <p style="color:var(--ink-300)">${ind.body.split(".")[0]}.</p>
        </div>`).join("")}
    </div>
  </div>
</section>



<section class="section section--tight">
  <div class="wrap">
    <div class="grid grid--2">
      <a class="card" href="product-${prev.slug}.html" data-reveal style="text-decoration:none">
        <span class="card__tag">← Previous product</span>
        <h3 class="mt-4" style="font-size:1.15rem">${prev.name}</h3>
      </a>
      <a class="card" href="product-${next.slug}.html" data-reveal data-delay="1" style="text-decoration:none;text-align:right">
        <span class="card__tag">Next product →</span>
        <h3 class="mt-4" style="font-size:1.15rem">${next.name}</h3>
      </a>
    </div>
  </div>
</section>
${ctaBand({
  eyebrow: "Enquiry",
  title: `Specify a ${f.short.toLowerCase()} for your application`,
  body: "Give us the fluid, the volume and the contamination. We will come back with the model, the configuration and a quotation.",
})}
`}
${f.layout ? `<section class="section section--tight">
  <div class="wrap">
    <div class="grid grid--2">
      <a class="card" href="product-${prev.slug}.html" data-reveal style="text-decoration:none">
        <span class="card__tag">← Previous product</span>
        <h3 class="mt-4" style="font-size:1.15rem">${prev.name}</h3>
      </a>
      <a class="card" href="product-${next.slug}.html" data-reveal data-delay="1" style="text-decoration:none;text-align:right">
        <span class="card__tag">Next product →</span>
        <h3 class="mt-4" style="font-size:1.15rem">${next.name}</h3>
      </a>
    </div>
  </div>
</section>` : ""}
`;
  return page({
    title: `${f.name} — ${f.series} | Ferrocare Machines Pvt. Ltd.`,
    description: `${f.summary.slice(0, 155)}`,
    current: "products.html",
    canonical: canon(`product-${f.slug}.html`),
    body,
  });
};

/* =============================== ABOUT ================================== */
const about = () => {
  const body = `
${pageHead({
  eyebrow: "Since 1980",
  title: "Four decades of taking contamination out of oil",
  lead: `Ferrocare Machines Private Limited is a Pune-based manufacturer and exporter of oil purification and filtration equipment. Incorporated in 1980, the company builds electrostatic liquid cleaners, low vacuum dehydration machines, filtration systems, coolant systems and condition monitoring instruments — and exports them from India.`,
  crumbs: [{ label: "Company" }],
})}

<!-- ================= who we are, told with photographs ================= -->
<section class="section">
  <div class="wrap">
    <div class="about-intro">
      <div class="about-intro__text" data-reveal>
        <span class="eyebrow">Who we are</span>
        <h2 class="mt-4">An engineering company that happens to sell machines</h2>
        <p class="lead mt-5">
          Ferrocare was set up in Pune in 1980 to solve a specific industrial problem:
          hydraulic and lubricating oil that degrades long before it needs to be. The
          answer the company settled on — electrostatic collection — is still the
          technology at the centre of the range, and still the reason customers return.
        </p>
        <p class="lead mt-5">
          Over four decades the range widened to cover the rest of that problem. Water
          needed vacuum dehydration. Bulk solids needed mechanical filtration. Grinding
          cells needed coolant systems. And proving any of it worked needed instruments.
          Today the company builds across all of those disciplines, so a recommendation
          is made against your oil rather than against a product list.
        </p>
      </div>
      <div class="about-intro__media" data-reveal data-delay="2">
        ${shot("elc-machine", "Ferrocare ELC electrostatic liquid cleaner")}
        <div class="about-intro__stack">
          ${shot("lvdh-machine", "Ferrocare LVDH low vacuum dehydration machine")}
          ${shot("opcom-handheld", "OPCOM offline particle counter")}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== journey (compact) ==================== -->
<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Our journey", title: "From 1980 to today", center: true })}
    <ol class="journey mt-8" data-reveal>
      ${[
        ["1980", "Incorporated in Pune", "Ferrocare Machines Pvt. Ltd. set up as a manufacturer of oil purification equipment."],
        ["1980s", "Kleentek licence", "Manufacturing under licence from Kleentek of Japan; offices in Mumbai, Delhi, Daman, Bangalore."],
        ["1990s", "ELC range scales up", "Electrostatic liquid cleaners grow into a full range — 1,000+ units across India."],
        ["2000s", "Vacuum dehydration", "LVDH machines for turbine, gear and hydraulic oil; EPT Canada chemistry for phosphate esters."],
        ["2010s", "Instrumentation", "Particle counters, moisture sensors and test kits to prove the oil is clean."],
        ["Today", "IoT & integrated", "MODBUS-ready controls and combined ELC + LVDH systems."],
      ].map(([y, t, d]) => `<li class="journey__item"><span class="journey__year">${y}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}
    </ol>
  </div>
</section>

<!-- ==================== works band, full bleed ==================== -->
<section class="band band--soft">
  <div class="band__bg">
    <img src="assets/img/install-5.jpg" alt="Ferrocare engineers commissioning an oil filtration unit on site" loading="lazy" decoding="async">
  </div>
  <div class="wrap">
    <div style="max-width:600px" data-reveal>
      <span class="eyebrow">The works</span>
      <h2 class="mt-4">Designed, built and tested in Kondhwa Budruk</h2>
      <p class="lead mt-5">
        A 6,000 sq ft manufacturing premises in south-east Pune. Fabrication, assembly,
        wiring, panel building and performance testing all happen here — which is why
        a duty point that falls outside the catalogue is a conversation rather than a
        refusal.
      </p>
      <ul class="checks mt-6">
        ${[
          "Skid, trolley and stationary formats in MS or SS",
          "EPT Canada acid-control chemistry for phosphate-ester fluids",
          "IoT and MODBUS control on the R-series ELC range",
          "Custom flow rate, viscosity and water-load sizing per application",
          "Factory acceptance testing before dispatch",
        ].map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<!-- ==================== certifications ==================== -->
<section class="section" id="certifications">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Certifications", title: "Certified quality and safety", center: true })}
    <div class="certs mt-8">
      ${certifications.map((c, i) => `
      <a class="cert" href="${c.file}" target="_blank" rel="noopener" data-reveal data-delay="${i + 1}">
        <span class="cert__img"><img src="assets/img/${c.img}" alt="${c.std} certificate — ${c.body}" loading="lazy"></span>
        <span class="cert__info">
          <span class="cert__std">${c.std}</span>
          <strong>${c.title}</strong>
          <span class="cert__meta">Certified by ${c.body}</span>
          <span class="cert__meta">Certificate No. ${c.no}</span>
          <span class="cert__meta">${[c.since, c.valid].filter(Boolean).join(" · ")}</span>
          <span class="link-arrow mt-4">View certificate ${icons.arrow}</span>
        </span>
      </a>`).join("")}
    </div>
    <p class="certs__scope" data-reveal>Scope: Manufacture, Supply &amp; Service of Oil Purification Machines</p>
  </div>
</section>

${ctaBand({
  eyebrow: "Visit us",
  title: "Come and see the machines being built",
  body: "The works and corporate office are in Kondhwa Budruk, Pune. Factory acceptance testing and pre-dispatch inspection visits are welcome by appointment.",
  primary: { href: "contact.html", label: "Arrange a visit" },
  secondary: { href: "products.html", label: "See the range" },
})}
`;
  return page({
    title: "Company — About Ferrocare Machines Pvt. Ltd., Pune | Established 1980",
    description:
      "Ferrocare Machines Private Limited — incorporated in Pune in 1980, manufacturer and exporter of electrostatic liquid cleaners, low vacuum dehydration machines, oil filtration systems and condition monitoring instruments.",
    current: "about.html",
    canonical: canon("about.html"),
    body,
  });
};

/* ============================== SERVICES ================================ */
const servicesPage = () => {
  const body = `
${pageHead({
  eyebrow: "Services",
  title: "Our Services",
  lead: "Beyond the machines — on-site oil cleaning, oil analysis, custom engineering, retrofits and annual maintenance to keep your oil and equipment in specification.",
  crumbs: [{ label: "Services" }],
})}

<section class="section">
  <div class="wrap">
    <div class="grid services-grid">
      ${services.map((s, i) => `
        <article class="card" data-reveal data-delay="${(i % 3) + 1}">
          <div class="card__ico ${i % 2 ? "card__ico--teal" : ""}">${icons[["droplet","gauge","layers","wrench","shield","filter"][i]]}</div>
          <span class="card__tag">${s.tag}</span>
          <h3 class="mt-4">${s.title}</h3>
          <p>${s.body}</p>
          <ul class="checks mt-5">
            ${s.points.slice(0, 3).map((p) => `<li>${icons.check}<span>${p}</span></li>`).join("")}
          </ul>
          <div class="card__foot">
            <span class="card__tag">Service</span>
            <a class="link-arrow" href="contact.html?service=${encodeURIComponent(s.title)}">Enquire ${icons.arrow}</a>
          </div>
        </article>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Coverage", title: "Support after the machine ships" })}
    <ol class="journey journey--5 mt-8" data-reveal>
      ${[
        ["01", "Commissioning", "Installation, piping, wiring, first fill and a baseline reading at handover."],
        ["02", "Operator training", "How the machine works, when to change elements, what the readings mean."],
        ["03", "Consumables supply", "Genuine collector paper and filter elements, held in stock."],
        ["04", "Preventive maintenance", "Scheduled visits to verify performance and catch wear early."],
        ["05", "Breakdown support", "Priority response with spares and service engineers."],
      ].map(([n, t, d]) => `<li class="journey__item"><span class="journey__year">${n}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}
    </ol>
  </div>
</section>

${ctaBand({
  eyebrow: "Services",
  title: "Stop changing oil. Start cleaning it.",
  body: "Clean oil lasts longer and protects your machines. Tell us about your oil and equipment — our engineers will recommend the right service or machine.",
  primary: { href: "contact.html", label: "Discuss a requirement" },
  secondary: { href: "faq.html", label: "Read the FAQ" },
})}
`;
  return page({
    title: "Services — On-site Oil Cleaning, Oil Analysis & AMC | Ferrocare Machines",
    description:
      "Ferrocare services: on-site oil cleaning and dehydration, oil analysis and condition assessment, custom engineered systems, retrofits and system integration, consumables, spares and annual maintenance contracts.",
    current: "services.html",
    canonical: canon("services.html"),
    body,
  });
};

/* ============================= INDUSTRIES =============================== */
const industriesPage = () => {
  const body = `
${pageHead({
  eyebrow: "Industries",
  title: "Industries We Serve",
  lead: "From steel mills to power stations, Ferrocare machines keep hydraulic, lube, turbine and gear oil clean across Indian industry.",
  crumbs: [{ label: "Industries" }],
})}

<section class="section">
  <div class="wrap">
    <div class="grid industries-grid">
      ${industries.map((ind, i) => `
        <article class="card" data-reveal data-delay="${(i % 4) + 1}">
          <div class="card__ico ${i % 2 ? "card__ico--teal" : ""}">${icons[["factory","bolt","gear","wrench","layers","globe","layers","shield"][i]] || icons.layers}</div>
          <h3>${ind.name}</h3>
          <p>${ind.body}</p>
          <div class="pcard__specs mt-5">
            ${ind.needs.map((n) => `<span class="chip chip--teal">${n}</span>`).join("")}
          </div>
        </article>`).join("")}
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Your industry",
  title: "Don't see your industry?",
  body: "Tell us your sector and the oil you run. Our engineers will recommend the right machine or service for your plant.",
})}
`;
  return page({
    title: "Industries Served — Steel, Power, Automotive, Machine Tools | Ferrocare Machines",
    description:
      "Ferrocare equipment is specified across steel and rolling mills, power generation, automotive and auto components, machine tools and grinding, cement and heavy engineering, ports and shipping, and plastic injection moulding.",
    current: "industries.html",
    canonical: canon("industries.html"),
    body,
  });
};

/* ================================= FAQ ================================== */
const faqPage = () => {
  const body = `
${pageHead({
  eyebrow: "FAQs",
  title: "Frequently Asked Questions",
  lead: "",
  crumbs: [{ label: "FAQ" }],
})}

<section class="section">
  <div class="wrap wrap--narrow">
    <div class="acc" id="faqAcc">
      ${faqs.map((f, i) => `
        <div class="acc__item" data-reveal>
          <button class="acc__btn" aria-expanded="false" aria-controls="faqp${i}">
            <span><span class="acc__num">${String(i + 1).padStart(2, "0")}</span>${f.q}</span>
            <span class="acc__ico">${icons.plus}</span>
          </button>
          <div class="acc__panel" id="faqp${i}" role="region">
            <div class="acc__body">${f.a}</div>
          </div>
        </div>`).join("")}
    </div>
    <div class="note mt-8" data-reveal>
      ${icons.phone}
      <div>Still unanswered? Call <a href="tel:${contact.phoneHref}" style="text-decoration:underline">${contact.phoneDisplay}</a> or email <a href="mailto:${contact.email}" style="text-decoration:underline">${contact.email}</a>. Office hours are 8:30 am to 6:30 pm Monday to Friday, and 8:30 am to 2:00 pm Saturday.</div>
    </div>
  </div>
</section>

`;
  return page({
    title: "FAQ — Electrostatic Cleaning, Dehydration & Filtration Questions | Ferrocare",
    description:
      "Answers to common questions about electrostatic oil cleaning, low vacuum dehydration, oil filtration sizing, additive safety, on-site oil cleaning service and oil testing.",
    current: "faq.html",
    canonical: canon("faq.html"),
    body,
  });
};

/* =============================== CONTACT ================================ */
const contactPage = () => {
  const body = `
${pageHead({
  eyebrow: "Contact",
  title: "Let's size a machine against your oil",
  lead: "Send us the fluid type, reservoir volume, flow rate and the contamination you are seeing. Our engineers will come back with the right model, the configuration and a quotation.",
  crumbs: [{ label: "Contact" }],
})}

<section class="section">
  <div class="wrap contact-grid">
    <div data-reveal>
      <span class="eyebrow">Corporate office &amp; works</span>
      <h2 class="mt-4" style="font-size:var(--t-h3)">Ferrocare Machines Private Limited</h2>
      <div class="info-list mt-7">
        <div class="info-item">
          <div class="info-item__ico">${icons.pin}</div>
          <div>
            <h4>Address</h4>
            <p>${contact.addressLines.join("<br>")}</p>
            <p class="mt-4"><a href="https://www.google.com/maps/search/?api=1&query=${contact.mapQuery}" target="_blank" rel="noopener">Open in Google Maps ${icons.arrowUpRight}</a></p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.phone}</div>
          <div>
            <h4>Telephone</h4>
            <p><a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a></p>
            <p class="muted">Landline ${contact.landlineDisplay}</p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.mail}</div>
          <div>
            <h4>Email</h4>
            <p><a href="mailto:${contact.email}">${contact.email}</a></p>
            <p><a href="mailto:${contact.emailAlt}">${contact.emailAlt}</a></p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.clock}</div>
          <div>
            <h4>Office hours</h4>
            <table class="spec-table">
              <tbody>
                ${contact.hours.map(([d, h]) => `<tr><th style="width:auto;padding-right:var(--s-5)">${d}</th><td>${h}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.shield}</div>
          <div>
            <h4>Registration</h4>
            <p class="mono">CIN ${legal.cin}</p>
            <p class="mono">GST ${legal.gst}</p>
            <p class="mono">IEC ${legal.iec}</p>
          </div>
        </div>
      </div>

      <div class="note mt-7">
        ${icons.clock}
        <div>For breakdown support on installed Ferrocare equipment, call the number above and state the machine model and serial number. Priority response applies to equipment under an annual maintenance contract.</div>
      </div>
    </div>

    <div data-reveal data-delay="2">
      <form class="form" id="enquiryForm" novalidate
              action="${FORM.endpoint}" method="POST"
              data-mode="${FORM.mode}"
              data-recipient="${FORM.recipient}"
              data-subject="${FORM.subject}">
        <h3 style="font-size:var(--t-h4)">Enquiry form</h3>
        <p class="muted mt-3" style="font-size:var(--t-sm)">Fields marked <span class="accent-text">*</span> are required. The more detail you give about the fluid and the duty, the more precise the recommendation.</p>

        <!-- Relay-service control fields -->
        <input type="hidden" name="_subject" value="${FORM.subject}">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="page" value="">
        <!-- Honeypot: bots fill this, people never see it -->
        <div class="hp" aria-hidden="true">
          <label for="f-website">Leave this field empty</label>
          <input id="f-website" type="text" name="_honey" tabindex="-1" autocomplete="off">
        </div>

        <div class="field-row mt-6">
          <div class="field">
            <label for="f-name">Name <span class="req">*</span></label>
            <input id="f-name" name="name" type="text" required autocomplete="name" placeholder="Your full name">
          </div>
          <div class="field" style="margin-top:0">
            <label for="f-company">Company <span class="req">*</span></label>
            <input id="f-company" name="company" type="text" required autocomplete="organization" placeholder="Organisation">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-email">Email <span class="req">*</span></label>
            <input id="f-email" name="email" type="email" required autocomplete="email" placeholder="name@company.com">
          </div>
          <div class="field" style="margin-top:0">
            <label for="f-phone">Phone</label>
            <input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+91">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-city">Location</label>
            <input id="f-city" name="city" type="text" placeholder="City, country">
          </div>
          <div class="field" style="margin-top:0">
            <label for="f-interest">Interest</label>
            <select id="f-interest" name="interest">
              <option value="">Select a family…</option>
              ${families.map((f) => `<option>${f.name}</option>`).join("")}
              <option>On-site oil cleaning service</option>
              <option>Oil analysis &amp; testing</option>
              <option>Consumables &amp; spares</option>
              <option>Annual maintenance contract</option>
              <option>Something else</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="f-fluid">Fluid &amp; duty detail</label>
          <input id="f-fluid" name="fluid" type="text" placeholder="e.g. hydraulic oil ISO VG 46, 3,000 L reservoir, water ingress">
        </div>

        <div class="field">
          <label for="f-msg">Requirement <span class="req">*</span></label>
          <textarea id="f-msg" name="message" required placeholder="Describe the contamination you are seeing, the machine or system involved, and what you need the oil to achieve."></textarea>
        </div>

        <div class="btn-row mt-6">
          <button class="btn btn--primary btn--lg" type="submit">Send enquiry ${icons.arrow}</button>
          <a class="btn btn--ghost btn--lg" href="tel:${contact.phoneHref}">Call instead</a>
        </div>

        <div class="form__success" id="formSuccess" role="status" hidden>
          <strong>Thank you — your enquiry has been sent.</strong><br>
          It has gone to Ferrocare's sales desk at
          <a href="mailto:${contact.email}" style="text-decoration:underline">${contact.email}</a>,
          and we will reply to the address you gave. If it is urgent, call
          <a href="tel:${contact.phoneHref}" style="text-decoration:underline">${contact.phoneDisplay}</a>.
        </div>

        <div class="form__error" id="formError" role="alert" hidden>
          <strong>That did not send.</strong>
          <span id="formErrorDetail">Please try again, or email us directly.</span>
          <a class="btn btn--ghost btn--sm mt-4" id="formMailto" href="#">Open in your email app instead</a>
        </div>

        <p class="form__note">
          Your details are used only to respond to this enquiry. Ferrocare does not sell
          or share contact information.
        </p>
      </form>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Finding us",
      title: "Kondhwa Budruk, Pune",
      lead: "The works and corporate office sit in the Danny Mehata Nagar industrial area of Kondhwa Budruk, in south-east Pune — roughly 12 km from Pune city centre and within reach of the Pune–Satara road industrial belt.",
      center: true,
    })}
    <div class="mt-8" data-reveal>
      <a class="split__media" style="display:block;text-decoration:none;min-height:280px"
         href="https://www.google.com/maps/search/?api=1&query=${contact.mapQuery}" target="_blank" rel="noopener">
        <div class="center">
          <div class="card__ico" style="margin-inline:auto">${icons.pin}</div>
          <h3 class="mt-5">${contact.addressShort}</h3>
          <p class="muted mt-4">Open in Google Maps ${icons.arrowUpRight}</p>
        </div>
      </a>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Before you write",
  title: "Have these four things ready",
  body: "Fluid type and viscosity grade · reservoir volume in litres · required flow rate or treatment time · the contamination you are seeing (particles, water, varnish, sludge). With those, we can size the machine in one exchange.",
  primary: { href: "products.html", label: "Check the range first" },
  secondary: { href: "faq.html", label: "Read the FAQ" },
})}
`;
  return page({
    title: "Contact — Ferrocare Machines Pvt. Ltd., Kondhwa Budruk, Pune 411048",
    description:
      "Contact Ferrocare Machines Private Limited: S. No. 32/3/8, Yewlewadi Road, Kondhwa Budruk, Pune 411048, Maharashtra. Phone +91 20 4603 3076. Enquire about oil filtration, electrostatic cleaning and dehydration equipment.",
    current: "contact.html",
    canonical: canon("contact.html"),
    body,
  });
};

/* ======================= FERROCARE INTERNATIONAL ======================== */
const intlPage = (file, crumb, title) => page({
  title: `${title} | Ferrocare International`,
  description: `${title} — Ferrocare International, Pune.`,
  current: file,
  canonical: canon(file),
  body: `
${pageHead({
  eyebrow: "Ferrocare International",
  title,
  lead: "Content coming soon.",
  crumbs: file === "international.html" ? [{ label: "Ferrocare International" }] : [{ label: "Ferrocare International", href: "international.html" }, { label: crumb }],
})}
`,
});

const INTL_ABOUT = {
  title: "NACHI, Japan – For high&#8209;speed, high&#8209;alloy &amp; stainless steels.",
  intro: "NACHI - FUJIKOSHI CORP. is one of Japan's most respected manufacturers of High Speed Steels, Special Steels, Alloy Steel, Cutting Tools, Hydraulic Equipment, Bearings and Machines with an employee strength exceeding 3,000 and Turnover exceeding US$ 1 billion & manufacturing facilities in Japan, Taiwan, Brazil, Spain and the USA. NACHI has pioneered and patented a process of continuous heat treatment of steel bars.",
  blocks: [
    { icon: "factory", lead: "Conventional methods like salt bath and vacuum no longer meet the demands of:", items: ["Pollution control", "Congenial work environment", "No deformation", "Labour cost reduction", "Consistent quality."] },
    { icon: "award", lead: "NACHI is the first company in the world to offer:", items: ["Hardened High Speed Steels from 0.3 mm dia. rounds and flats in 2000 mm lengths in M2 / M35 / M42 & ASP grades.", "Hardened Stainless Steels from 1mm to 13mm dia. in SUS420JS Grade.", "Carbide wires … including the thinnest … 0.04mm dia."] },
    { icon: "wrench", lead: "Applications include:", items: ["Cutting tools, piercing punches, ejector pins, knives.", "Vanes for hydraulic vane pumps and rotary refrigeration compressors.", "Surgical drills for hardened SS materials.", "Dot pins of dot matrix print heads, EDM Wires for Carbide wires."] },
  ],
};
const intlAbout = () => page({
  title: "Ferrocare International — NACHI, Japan | Ferrocare",
  description: "Ferrocare International represents NACHI-FUJIKOSHI Corp., Japan — high-speed, high-alloy and stainless steels.",
  current: "international.html",
  canonical: canon("international.html"),
  body: `
<section class="page-head">
  <div class="wrap page-head__inner" data-reveal>
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>Ferrocare International</span></nav>
    <span class="eyebrow mt-5">Ferrocare International</span>
    <h1 class="intl__h1">${INTL_ABOUT.title}</h1>
    <p class="lead mt-6 intl__lead">${INTL_ABOUT.intro}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <ol class="itl">
      ${INTL_ABOUT.blocks.map((b, i) => `
      <li class="itl__item" data-reveal data-delay="${i}">
        <span class="itl__node">${icons[b.icon]}</span>
        <div class="itl__card">
          <span class="itl__num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${b.lead}</h3>
          <ul>${b.items.map((x) => `<li>${icons.check}<span>${x}</span></li>`).join("")}</ul>
        </div>
      </li>`).join("")}
    </ol>
  </div>
</section>
`,
});

const intlNachi = () => page({
  title: "NACHI Hardened High Speed Steel Bars | Ferrocare International",
  description: "NACHI hardened high speed steel bars — Pre-Harden and Micron-Hard steel bars from NACHI-FUJIKOSHI, Japan, through Ferrocare International, official distribution partner for India.",
  current: "international-nachi-steels.html",
  canonical: canon("international-nachi-steels.html"),
  body: `
<section class="phero">
  <div class="wrap phero__grid">
    <div class="phero__text" data-reveal>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="international.html">Ferrocare International</a><span>/</span><span>Nachi – Japan Special Steels</span></nav>
      <span class="partner">${PICON.shield}<span><strong>Official Distribution Partner</strong>for India</span></span>
      <h1 class="mt-5">NACHI Hardened High Speed Steel Bars</h1>
      <span class="eyebrow mt-5">Premium Japanese Precision Steel Solutions</span>
      <p class="lead mt-5">NACHI, Japan is a global leader in high speed steel and specialty steel manufacturing. Engineered for performance, our bars deliver exceptional hardness, dimensional accuracy and long tool life.</p>
    </div>
    <div class="viewer viewer--wide" data-reveal data-delay="2">
      <div class="viewer__stage">
        <div class="viewer__glow" aria-hidden="true"></div>
        <img class="viewer__img is-on" src="assets/img/nachi/hss-bars.jpg" alt="NACHI hardened high speed steel bars" decoding="async">
      </div>
    </div>
  </div>
</section>

<section class="section section--tight kstats-band">
  <div class="wrap">
    <div class="kstats">
      ${[
        ["award", "Japanese Quality", "Manufactured by NACHI Japan to the highest standards."],
        ["target", "High Precision", "Tight dimensional tolerance for consistent performance."],
        ["shield", "Excellent Hardness", "Superior wear resistance and tool life."],
        ["gauge", "Dimensional Accuracy", "Straightness, hardness and ovality guaranteed."],
      ].map(([ic, t, d], i) => `
      <div class="kcard" data-reveal data-delay="${i}">
        <span class="kcard__ico">${PICON[ic] || icons[ic]}</span>
        <div><strong>${t}</strong><span>${d}</span></div>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap nabout" data-reveal>
    <span class="nabout__globe" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="24" r="18"/><ellipse class="spin-x" cx="24" cy="24" rx="8" ry="18"/><path d="M6 24h36M9 15h30M9 33h30M24 6v36"/></svg></span>
    <div>
      <h2>About NACHI</h2>
      <p class="lead mt-5">NACHI-FUJIKOSHI CORP., Japan is one of the world's most respected manufacturers of High Speed Steels, Special Steels and Alloy Steels with state-of-the-art manufacturing facilities in Japan, Taiwan, Brazil, Spain and the USA.</p>
      <p class="lead mt-4">NACHI has pioneered and patented a process of continuous heat treatment of steel bar as it is drawn. This allows the production of bars upto 2 meters length with guaranteed straightness, hardness, ovality and micro-structure. Sizes upto 2 mm are in h8 tolerance in precision bright condition.</p>
    </div>
  </div>
</section>

<section class="section kstats-band">
  <div class="wrap apps-grid">
    <div data-reveal>
      ${sectionHead({ title: "Our range" })}
      <div class="range mt-6">
        ${[
          ["Pre-Harden Steel Bars", "nachi/pre-harden.jpg", "assets/docs/nachi-pre-harden.pdf"],
          ["Micron-Hard Steel Bars", "nachi/micron-hard.jpg", "assets/docs/nachi-micron-hard.pdf"],
        ].map(([n, im, pdf]) => `
        <a class="range__card" href="${pdf}" target="_blank" rel="noopener">
          <span class="range__img"><img src="assets/img/${im}" alt="${n}" loading="lazy"></span>
          <strong>${n}</strong>
          <span class="link-arrow">View Details ${icons.arrow}</span>
        </a>`).join("")}
      </div>
    </div>
    <div class="apps" data-reveal data-delay="2">
      <h3 class="apps__title">Applications</h3>
      <ul class="apps__list apps__list--one">
        ${["Cutting tools, piercing punches, ejector pins, knives", "Vanes for hydraulic vane pumps and rotary refrigeration compressors", "Surgical drills for hardened SS materials", "Dot pins of dot matrix print heads", "EDM wires for carbide wires"].map((a) => `<li><span class="apps__ico">${PICON.check}</span>${a}</li>`).join("")}
      </ul>
    </div>
  </div>
</section>
`,
});

/* =============================== WRITE ================================== */
const pages = {
  "index.html": home(),
  "products.html": products(),
  "about.html": about(),
  "services.html": servicesPage(),
  "international.html": intlAbout(),
  "international-hydraulic-units.html": intlPage("international-hydraulic-units.html", "Hydraulic Units", "Hydraulic Units"),
  "international-piston-pumps.html": intlPage("international-piston-pumps.html", "Piston Pumps", "Piston Pumps"),
  "international-nachi-steels.html": intlNachi(),
  "faq.html": faqPage(),
  "contact.html": contactPage(),
};
families.forEach((f, i) => { pages[`product-${f.slug}.html`] = productDetail(f, i); });

mkdirSync(ROOT, { recursive: true });
for (const [name, html] of Object.entries(pages)) {
  writeFileSync(join(ROOT, name), html, "utf8");
  console.log(`  ✓ ${name.padEnd(46)} ${(html.length / 1024).toFixed(1)} KB`);
}
console.log(`\nBuilt ${Object.keys(pages).length} pages.`);
