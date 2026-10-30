/* ==========================================================================
   Ferrocare Machines Pvt. Ltd. — Site content model

   SOURCES
   Specifications and model designations are taken from Ferrocare's own
   published catalogues (ELC catalogue, LVDH catalogue, Oil Test Equipment
   catalogue, Gearbox/Magnetix/EPT catalogue, Particle Counter & Moisture
   Sensor catalogue) and from their product-range pages on ferrocare.net.
   Where public listings conflict with the catalogues, the catalogue figure
   is used. See PRODUCT-ANALYSIS.md for the conflicts that were identified.
   ========================================================================== */

export const company = {
  name: "Ferrocare Machines Private Limited",
  shortName: "Ferrocare",
  tagline: "Oil that stays clean, machines that stay precise.",
  legal: {
    cin: "U29299MH1980PTC022218",
    gst: "27AAACF3571A1Z3",
    iec: "0388082992",
    founded: "1980",
    nature: "Manufacturer & Exporter",
    employees: "26–50 people",
    turnover: "₹25–100 Cr",
    premises: "6,000 sq ft works, Pune",
  },
  contact: {
    addressLines: [
      "S. No. 32/3/8, Yewlewadi Road,",
      "Kondhwa Budruk, Pune – 411048",
      "Maharashtra, India",
    ],
    addressShort: "Kondhwa Budruk, Pune – 411048, Maharashtra, India",
    phoneDisplay: "+91 20 4603 3076",
    phoneHref: "+912046033076",
    landlineDisplay: "080 4603 3076",
    mobileDisplay: "+91 96079 74281",
    mobileHref: "+919607974281",
    email: "info@ferrocare.com",
    emailAlt: "sales@ferrocare.com",
    hours: [
      ["Monday – Friday", "8:30 am – 6:30 pm"],
      ["Saturday", "8:30 am – 2:00 pm"],
      ["Sunday", "Closed"],
    ],
    mapQuery: "Ferrocare+Machines+Private+Limited+Kondhwa+Budruk+Pune+411048",
    rating: { score: "4.5", count: 13 },
  },
  web: {
    primary: "https://www.ferrocare.net/",
    secondary: "https://www.ferrocare.com/",
  },
  /* ------------------------------------------------------------------------
     Contact-form delivery.

     The site is static (GitHub Pages), so the form posts to a relay service
     rather than to a server of our own. FormSubmit is configured by default
     because it needs no account and no API key — only a one-time activation
     click on the first email it sends to the address below.

     To switch providers, change `endpoint` and set `mode`:
       formsubmit : https://formsubmit.co/ajax/<email>          (no signup)
       formspree  : https://formspree.io/f/<form-id>            (free account)
       web3forms  : https://api.web3forms.com/submit            (free key)
     ------------------------------------------------------------------------ */
  form: {
    endpoint: "https://formsubmit.co/ajax/info@ferrocare.com",
    mode: "formsubmit",
    subject: "Website enquiry — Ferrocare Machines",
    recipient: "info@ferrocare.com",
  },
};

/* Installed base & credentials */
export const proof = [
  { value: "1,000+", label: "ELC units installed in India" },
  { value: "25,000+", label: "Kleentek ELC units worldwide" },
  { value: "1980", label: "Manufacturing since" },
  { value: "6,000", label: "Sq ft works, Pune" },
];

/* Clients — from Ferrocare's own client listings, historical and current.
   Presented as plants supplied across four decades. */
export const clients = [
  "Tata Motors", "Tata Steel", "Maruti", "Bajaj Auto", "Ashok Leyland",
  "Mahindra", "TVS", "Hero Honda", "BHEL", "NTPC", "Tata Power", "NHPC",
  "Reliance Power", "Jindal", "Essar", "Bhushan Steel", "Vizag Steel",
  "SAIL plants", "ACC", "L&T", "Philips", "Godrej", "Videocon", "Whirlpool",
  "Nilkamal", "Supreme", "Cello", "Motherson", "Lumax", "HAL", "DRDO",
  "Ordnance Factories", "Yuken", "Eaton Vickers", "Parker", "MOOG",
  "Ferromatic", "BILT", "NITCO", "H&R Johnson",
];

/* ==========================================================================
   Product families
   ========================================================================== */
const allFamilies = [
  {
    slug: "electrostatic-liquid-cleaners",
    img: "elc-machine.jpg",
    gallery: [
      { img: "elc-machine", caption: "ELC electrostatic liquid cleaner, trolley mounted" },
      { img: "collector-loading", caption: "Loading cellulose collector media into an ELC machine" },
      { img: "electrodes", caption: "Electrode assembly — collectors, positive and ground electrodes, PVC plate" },
      { img: "elc-machine-2", caption: "ELC unit at work on a machine reservoir" },
    ],
    art: "elc",
    name: "Electrostatic Liquid Cleaners",
    short: "Electrostatic Liquid Cleaners",
    series: "ELC Series",
    group: "oil",
    tagline: "Sub-micron cleaning without touching the oil's chemistry",
    chips: ["1 µ & below", "Removes sludge & varnish", "IoT / MODBUS ready"],
    summary:
      "The machine that built Ferrocare. A high-voltage electrostatic field captures suspended wear metal, sludge and varnish down to 1 micron and below — far finer than any mechanical element can reach, and without consuming the oil's additives.",
    technology:
      "Two sets of stainless-steel electrodes are charged positive and negative by a special transformer. As oil flows freely between them, every suspended particle — metallic or non-metallic — migrates to the electrode of opposite polarity, collecting where the deformed electric field is strongest on the pleated dielectric media. The technology was originally licensed from Kleentek of Japan and has been built in Pune since the 1980s; over 1,000 units are in service in India and more than 25,000 worldwide.",
    highlights: [
      "Removes particles to 1 micron and below — theoretically to 0.01 µ",
      "Strips sludge and varnish that filters cannot 'see' as particles",
      "Captures metal, paper, wood, plastic, rubber debris and even bacteria",
      "Extends the working life of both the oil and the machine's fine filters",
      "Protects servo valves, pumps and sliding mechanisms from precision loss",
      "R-series models are IoT enabled with MODBUS output — live data to PC or Android",
    ],
    limits: [
      "Mineral base oils only — not intended for IC engine oil",
      "Maximum moisture content 500 ppm",
      "Maximum operating temperature 60 °C",
      "Special specification available for synthetic oils",
      "For NAS 7 or better cleanliness, derate the rated oil quantity by 50 %",
    ],
    /* The catalogue Selection Guide: maximum litres of oil the unit maintains,
       by ISO viscosity grade. The single most useful sizing table Ferrocare
       publishes, and the reason a heavier oil needs a bigger machine. */
    selectionGuide: {
      caption: "ELC selection guide — maximum litres of oil maintained, by ISO VG grade",
      columns: ["Model", "VG 32", "VG 46", "VG 68", "VG 100", "Dimensions (mm)", "Weight", "Pump"],
      rows: [
        ["ELC 8 LP",   "2,500",    "1,700",   "1,100",   "600",     "610 × 480 × 540",       "70 kg",  "2 L/min"],
        ["ELC 25 A",   "6,000",    "4,200",   "2,800",   "1,500",   "800 × 505 × 680",       "100 kg", "3.5 L/min"],
        ["ELC 50 C",   "12,000",   "8,300",   "5,600",   "3,000",   "780 × 505 × 880",       "140 kg", "10 L/min"],
        ["ELC 100 LP", "30,000",   "20,000",  "14,000",  "7,600",   "920 × 630 × 950",       "180 kg", "10 L/min"],
        ["ELC R 25",   "7,000",    "5,000",   "3,000",   "2,000",   "690 × 450 × 800",       "90 kg",  "3.5 L/min"],
        ["ELC 50 R",   "15,000",   "10,000",  "7,500",   "4,000",   "690 × 450 × 800",       "110 kg", "10 L/min"],
        ["ELC R 100",  "30,000",   "20,000",  "14,000",  "7,600",   "690 × 500 × 1,100",     "120 kg", "10 L/min"],
        ["ELC R 200",  "30,000",   "20,000",  "15,000",  "8,000",   "1,140 × 500 × 1,170",   "180 kg", "20 L/min"],
        ["ELC R 400",  "60,000",   "40,000",  "30,000",  "16,000",  "1,250 × 1,060 × 1,170", "360 kg", "30 L/min"],
        ["ELC R 600",  "1,20,000", "80,000",  "60,000",  "32,000",  "1,705 × 1,060 × 1,200", "450 kg", "50 L/min"],
      ],
      note:
        "Ratings are the maximum quantity of oil the unit maintains at that viscosity grade. For NAS 7 or better, derate by 50 %. Larger reservoirs are served by recirculation rather than by a single pass.",
    },
    models: [
      {
        name: "ELC 8 LP",
        note: "Entry model for individual machine tools and small power packs.",
        specs: {
          "Max oil maintained": "2,500 L at VG 32 · 600 L at VG 100",
          "Pump flow": "2 L/min",
          "Dimension": "610 × 480 × 540 mm",
          "Weight": "70 kg",
          "Power": "250 W",
        },
      },
      {
        name: "ELC 25 A",
        note: "Compact workhorse for small hydraulic systems.",
        specs: {
          "Max oil maintained": "6,000 L at VG 32 · 1,500 L at VG 100",
          "Pump flow": "3.5 L/min",
          "Dimension": "800 × 505 × 680 mm",
          "Weight": "100 kg",
          "Power": "250 W",
          "Input supply": "1 phase / 3 phase",
        },
      },
      {
        name: "ELC 50 C",
        note: "The most widely deployed model in the range.",
        specs: {
          "Max oil maintained": "12,000 L at VG 32 · 3,000 L at VG 100",
          "Pump flow": "10 L/min",
          "Dimension": "780 × 505 × 880 mm",
          "Weight": "140 kg",
          "Power": "500 W",
          "Max temperature": "Up to 60 °C",
          "Filtration rating": "5 µm",
          "Particle cleanliness": "ISO 18/16/13",
          "Mounting": "Trolley mounted",
        },
      },
      {
        name: "ELC 100 LP",
        note: "Large-reservoir model for central hydraulic systems and turbine lube oil.",
        specs: {
          "Max oil maintained": "30,000 L at VG 32 · 7,600 L at VG 100",
          "Pump flow": "10 L/min",
          "Dimension": "920 × 630 × 950 mm",
          "Weight": "180 kg",
          "Power": "550 W",
          "Power supply": "380–415 V, 3 phase",
          "Max viscosity": "100 cSt",
          "Oil types": "Hydraulic, turbine and lube oil",
        },
      },
      {
        name: "ELC 50 C — Balancing Tank",
        note: "Adds a balancing tank for systems where reservoir volume fluctuates.",
        specs: {
          "Flow rate": "1,000 LPH",
          "Capacity": "50 L",
          "Pump flow rate": "12 LPM",
          "Operating pressure": "1.5 kg/cm²",
          "Power supply": "440 V, 3 phase",
        },
      },
      {
        name: "ELC 50 C — Dehydration Cell",
        note: "Combines electrostatic collection with a dehydration stage for wet systems.",
        specs: {
          "Function": "Particulate + moisture removal",
          "Weight": "110 kg",
          "Power": "500 W",
          "Mounting": "Trolley mounted",
          "Water removal": "Yes",
        },
      },
      {
        name: "Electrostatic Coalescer — 10 LPM",
        note: "Stainless-steel frame variant tuned for lower-viscosity oils, with water removal.",
        specs: {
          "Flow rate": "250 LPH",
          "Pump flow rate": "10 LPM",
          "Oil capacity": "2,000 L",
          "Max viscosity": "46 cSt",
          "Frame material": "Stainless steel",
          "Power supply": "380 V, 3 phase",
          "Water removal": "Yes",
        },
      },
      {
        name: "ELC R Series — R25 / 50R / R100 / R200 / R400 / R600",
        note: "New-generation range with enhanced capacity and speed, IoT enabled with MODBUS processors. Live condition data to PC or Android handset; automatic moisture, NAS and ISO particle readout with self-diagnostic touchscreen.",
        specs: {
          "Max oil maintained": "7,000 L (R25) up to 1,20,000 L (R600) at VG 32",
          "Pump flow": "3.5 to 50 L/min",
          "Weight": "90 kg to 450 kg",
          "Connectivity": "IoT enabled · MODBUS processor",
          "Display": "Touchscreen with self-diagnostics",
          "Outputs": "Moisture ppm · NAS · ISO particle codes",
        },
      },
      {
        name: "Dust Collector Paper for ELC",
        note: "The cellulose collector media every ELC machine consumes — a genuine Ferrocare consumable.",
        specs: {
          "Filter media": "Cellulose",
          "Filtering area": "126 m²",
          "Air flow rate": "3,000 m³/hr",
          "Number of filters": "Above 50",
          "Frequency": "50 Hz",
        },
      },
    ],
  },

  {
    slug: "low-vacuum-dehydration",
    img: "lvdh-machine.jpg",
    gallery: [
      { img: "lvdh-machine", caption: "LVDH low vacuum dehydration machine, refrigerated condenser" },
      { img: "lvdh-machine-2", caption: "LVDH unit — compact frame for machine-level duty" },
      { img: "controller", caption: "Control panel — temperature, vacuum and pump sequencing" },
      { img: "install-3", caption: "LVDH unit in service at a power plant lube system" },
    ],
    art: "lvdh",
    name: "Low Vacuum Dehydration & Degassification",
    short: "Low Vacuum Dehydration",
    series: "LVDH Series",
    group: "oil",
    tagline: "100 % free water and emulsified moisture, removed",
    chips: ["10–20 ppm final water", "Boils water below 53 °C", "Refrigerated condenser"],
    summary:
      "Vacuum, heat and mass transfer working together. The LVDH range pulls free water, dissolved moisture and entrained gases out of hydraulic, gear, turbine and lube oils — so oil returns to specification instead of being replaced.",
    technology:
      "Oil is indirectly heated and fed into a vacuum chamber where it is dispersed as a thin film. Under vacuum, water boils below 53 °C — comfortably inside what the oil tolerates — so moisture flashes off without burn-off, oxidation or additive depletion. A refrigerated condenser collects the water; dissolved air and gases are bled off by the vacuum pump. A single pass reduces water content by 0.25–1.5 %, and recirculation takes it to zero free water or 50 % below saturation. Cracked low-molecular-weight oil is removed along with the water.",
    highlights: [
      "Removes 100 % of free water plus emulsified moisture",
      "A single pass reduces water content by 0.25–1.5 %",
      "Final water content of 10–20 ppm; vacuum to 1–5 mbar",
      "Water boils below 53 °C under vacuum — no thermal stress, no additive loss",
      "Handles hydraulic, turbine, lube, gear and compressor oils",
      "Refrigerated condensers standard across the range",
      "Also used for dehydration ahead of oil blending",
    ],
    models: [
      {
        name: "LVDH-600",
        note: "Compact unit for machine-level and small-reservoir dehydration.",
        specs: {
          "Capacity": "8–10 L/min",
          "Condenser": "Refrigerated",
          "Power": "6 kW at 415 VAC, 3P+N+E, 50 Hz",
          "Dimension": "1,470 × 785 × 1,480 mm",
          "Weight": "390 kg",
        },
      },
      {
        name: "LVDH-900",
        note: "Mid-range unit; the base model for degassification duty.",
        specs: {
          "Capacity": "13–15 L/min",
          "Condenser": "Refrigerated",
          "Power": "8 kW",
          "Dimension": "1,470 × 785 × 1,480 mm",
          "Weight": "480 kg",
          "Vacuum pump": "180 LPM",
        },
      },
      {
        name: "LVDH-2100",
        note: "High-capacity unit for central systems and continuous purification.",
        specs: {
          "Capacity": "30–35 L/min",
          "Condenser": "Refrigerated",
          "Power": "16 kW",
          "Dimension": "1,575 × 945 × 1,580 mm",
          "Weight": "600 kg",
          "Vacuum pump": "300 LPM",
        },
      },
      {
        name: "LVDH-3000",
        note: "Large-frame unit for plant-scale reservoir treatment.",
        specs: {
          "Capacity": "40–50 L/min",
          "Condenser": "Refrigerated",
          "Power": "16 kW",
          "Dimension": "1,610 × 1,050 × 1,460 mm",
          "Weight": "650 kg",
        },
      },
      {
        name: "LVDH-6000",
        note: "Top of the range — for the largest turbine and central lube reservoirs.",
        specs: {
          "Capacity": "80–100 L/min",
          "Condenser": "Refrigerated",
          "Power": "24 kW",
          "Dimension": "2,100 × 1,455 × 1,945 mm",
          "Weight": "850 kg",
        },
      },
      {
        name: "Lubrication LVDH — 320 cSt",
        note: "Heavy-viscosity specification for gear and paper-machine lube oils.",
        specs: {
          "Oil flow rate": "600 LPH",
          "Viscosity handled": "320 cSt",
          "Water content handled": "20,000 ppm",
          "Oil dirt level": "Below NAS 12",
          "Heater load": "12 kW",
          "Mounting": "Skid mounted",
          "Footprint": "1,800 × 700 mm",
        },
      },
      {
        name: "LVDH with Mechanical Filtration",
        note: "Dehydration combined with a two- or three-stage mechanical filter train on the same frame, for oil carrying both water and heavy solid contamination.",
        specs: {
          "Function": "Vacuum dehydration + multi-stage solid removal",
          "Filtration stages": "Two stage or three stage",
          "Element ratings": "1, 3, 5, 10, 25, 40 µm",
          "Final water": "10–20 ppm",
          "Mounting": "Skid or trolley",
          "Application": "Gear, hydraulic and lube oils with mixed contamination",
        },
      },
      {
        name: "LVDH Skid — 1 mbar specification",
        note: "Plant-grade dehydration skid reaching 1 mbar and 10 ppm final water.",
        specs: {
          "Oil flow rate": "2,000 LPH",
          "Final water": "10 ppm",
          "Max vacuum": "1 mbar",
          "Heater load": "6 kW",
          "Capacity": "Up to 6,000 LPH",
          "Handled oil": "Hydraulic, gear, turbine, lube",
          "Material": "SS / MS",
        },
      },
    ],
  },

  {
    slug: "integrated-clean-dehydrate",
    img: "elc-2stage.jpg",
    gallery: [
      { img: "elc-2stage", caption: "Integrated ELC + LVDH unit — electrostatic section and vacuum chamber" },
      { img: "elc-3stage", caption: "Integrated unit with multi-stage filtration and pump set" },
      { img: "electrodes", caption: "Electrode stack from the electrostatic section" },
      { img: "controller", caption: "Touchscreen control with live moisture, NAS and ISO readout" },
    ],
    art: "integrated",
    name: "Integrated ELC + LVDH Systems",
    short: "Integrated Clean & Dehydrate",
    series: "I-Series",
    group: "oil",
    tagline: "Electrostatic cleaning and vacuum dehydration in one machine",
    chips: ["Particulate + water", "Touchscreen control", "Live ISO / NAS readout"],
    summary:
      "For oil that is both dirty and wet — which is most oil in real plants. The I-Series combines the electrostatic collector and the vacuum dehydration chamber on a single frame, so one machine removes particles, sludge, varnish, free water and dissolved moisture in a single circulation.",
    technology:
      "Oil passes first through the electrostatic collector, where charged electrodes take out suspended particles, sludge and varnish, then into the vacuum chamber where it is dispersed as a thin film and moisture flashes off below 53 °C. Because the electrostatic stage removes the solid contamination before the oil reaches the vacuum section, the vacuum side stays clean and the whole machine holds performance far longer between services than either technology working alone.",
    highlights: [
      "Particles, sludge, varnish, free water and dissolved moisture in one pass",
      "Automatic moisture ppm, NAS and ISO particle readout",
      "Self-diagnostic touchscreen control panel",
      "Live condition data to PC or smartphone",
      "Combined footprint smaller than two separate machines",
      "Sized for central hydraulic, turbine and gear lube systems",
    ],
    models: [
      {
        name: "I-600",
        note: "Integrated unit for machine-level and mid-size reservoir duty.",
        specs: {
          "Capacity": "8–10 L/min",
          "Power": "6 kW",
          "Dimension": "1,470 × 1,320 × 1,260 mm",
          "Weight": "610 kg",
          "Monitoring": "Auto moisture ppm · NAS / ISO particle readout",
        },
      },
      {
        name: "I-900",
        note: "The mid-range integrated model.",
        specs: {
          "Capacity": "13–15 L/min",
          "Power": "8 kW",
          "Dimension": "1,470 × 1,350 × 1,260 mm",
          "Weight": "700 kg",
          "Monitoring": "Auto moisture ppm · NAS / ISO particle readout",
        },
      },
      {
        name: "I-2100",
        note: "Large integrated system for central plant reservoirs.",
        specs: {
          "Capacity": "30–35 L/min",
          "Power": "16 kW",
          "Dimension": "1,745 × 1,560 × 1,260 mm",
          "Weight": "865 kg",
          "Control": "Self-diagnostic touchscreen",
          "Monitoring": "Auto moisture ppm · NAS / ISO particle readout",
        },
      },
    ],
  },

  {
    slug: "hydraulic-oil-filtration-machines",
    img: "filtration-unit.jpg",
    gallery: [
      { img: "filtration-unit", caption: "Hydraulic oil filtration unit with magnetic strainer and cartridge train" },
      { img: "elc-3stage", caption: "Multi-stage filtration unit with pump and motor set" },
      { img: "filter-elements", caption: "Cartridge elements — pleated fine element and mesh strainer" },
      { img: "install-4", caption: "Portable filtration unit connected to a press hydraulic system" },
    ],
    art: "hydraulic",
    name: "Hydraulic & Lube Oil Filtration Machines",
    short: "Hydraulic Oil Filtration",
    series: "FRF / Multistage",
    group: "filtration",
    tagline: "Portable, trolley and inline solid removal",
    chips: ["Magnetic pre-strainer", "3–5 µm multi-stage", "1–40 µm elements"],
    summary:
      "Mechanical filtration engineered around real hydraulic circuits. Magnetic pre-straining, multi-stage cartridge trains and single-pass trolley units that restore ISO cleanliness codes on injection moulding machines, presses, machine tools and test rigs — on site, without draining the system.",
    technology:
      "Oil is drawn from the reservoir through a high-intensity magnetic strainer that pins ferrous wear debris, then through progressively finer cartridge elements in a multi-stage train. Staging lets each element do one job — bulk dirt, then fine silt, then polish — which multiplies element life and holds differential pressure low. Units couple to the reservoir through quick-couplers, so filtration happens while the machine keeps running.",
    highlights: [
      "Magnetic strainer stage pins ferrous wear particles before the elements",
      "Multi-stage cartridge trains for FRF, hydraulic and lube oils",
      "Single-pass filtration to 3–5 µm with low differential pressure",
      "Trolley and portable formats for servicing several machines from one unit",
      "Element ratings available from 1, 3, 5, 10, 25 and 40 µm",
      "Cartridge working pressure 5–10 bar",
    ],
    models: [
      {
        name: "Hydraulic Oil Filtration Machine — Magnetic Strainer",
        note: "The core single-pass machine: magnetic pre-strainer ahead of a two-stage cartridge train.",
        specs: {
          "Flow rate": "75 LPM",
          "Working pressure": "10 bar",
          "Filtration rating": "10 µm",
          "Motor power": "2 HP",
          "Stages": "Two stage",
          "Dimension": "740 × 710 × 920 mm",
          "Weight": "85 kg",
        },
      },
      {
        name: "Automatic Oil Filtration Machine",
        note: "Runs unattended on a timer or differential-pressure cycle.",
        specs: {
          "Capacity": "200 LPH",
          "Automation": "Fully automatic",
          "Function": "Continuous offline filtration",
          "Mounting": "Trolley / stationary",
        },
      },
      {
        name: "Dehydration Oil Filtration Machine",
        note: "Filtration combined with a dehydration stage for wet hydraulic oil.",
        specs: {
          "Capacity": "2,000 LPH",
          "Function": "Solid removal + moisture reduction",
          "Automation": "Automatic",
        },
      },
      {
        name: "Hydraulic Oil Filtration Trolley",
        note: "Four-wheel trolley with hose set for plant-wide servicing rounds.",
        specs: {
          "Flow rate": "10–20 L/min",
          "Filtration rating": "5 µm",
          "Format": "Trolley with hose set",
          "Application": "Plant-wide offline filtration",
        },
      },
      {
        name: "Filtration Unit with Multistage Filtration for FRF Oil",
        note: "Purpose-built for fire-resistant fluid circuits in steel and power plants.",
        specs: {
          "Capacity": "800 LPH",
          "Fluid": "Fire-resistant hydraulic fluid",
          "Stages": "Multi-stage cartridge train",
          "Application": "Steel, power generation",
        },
      },
      {
        name: "Multi-Stage Oil Filtration Machine",
        note: "Higher-throughput multi-stage unit for continuous duty.",
        specs: {
          "Capacity": "1,000 LPH",
          "Stages": "Multi-stage cartridge train",
          "Automation": "Automatic",
        },
      },
      {
        name: "Injection Moulding — Oil Filtration System",
        note: "Configured for plastic injection moulding machine hydraulics.",
        specs: {
          "Capacity": "500 LPH",
          "Application": "Injection moulding machines",
          "Benefit": "Servo valve protection",
          "Mounting": "Portable / trolley",
        },
      },
      {
        name: "Lube Oil Treatment Machine",
        note: "Three-stage treatment for circulating lube systems.",
        specs: {
          "Motor power": "1.5 HP",
          "Filtration stage": "Three stage",
          "Application": "Circulating lube oil",
        },
      },
    ],
  },

  {
    slug: "oil-filtration-plants",
    img: "elc-3stage.jpg",
    gallery: [
      { img: "elc-3stage", caption: "Skid-mounted oil filtration plant with multi-stage train" },
      { img: "filtration-unit", caption: "Duty unit with magnetic pre-strainer and cartridge housing" },
      { img: "gearbox-unit", caption: "Filtration unit arranged for direct gearbox coupling" },
      { img: "install-2", caption: "Plant installation during commissioning" },
    ],
    art: "plant",
    name: "Oil Filtration Plants & Units",
    short: "Oil Filtration Plants",
    series: "Gear / EH / Magnetix / EPT",
    group: "filtration",
    tagline: "Skid-mounted systems for the heavy end of the plant",
    chips: ["Gear / EH / glycol / FRF", "Up to 6,000 LPH", "EPT acid control"],
    summary:
      "Installed, plumbed and wired units for gear oil, EH control oil, lube oil, water-glycol and phosphate-ester circuits. Built for steel mills, power stations, cement plants and heavy engineering — where filtration is a permanent part of the process, not a service visit.",
    technology:
      "Each plant is assembled on a fabricated skid around the duty point. Gear oil units attach directly to the gearbox and lift carbon deposits out of the sump. EH and phosphate-ester units are built to control acid number and working pressure in turbine control circuits — Ferrocare builds these in India using critical acid-control resins from EPT of Canada. Water-glycol units handle the high-water-content fluid that standard filters cannot touch, with two-stage filtration at 16 bar. Magnetix separators use rare-earth magnets giving up to eight times the force of ferrite, with dry cake discharge and no consumables.",
    highlights: [
      "Gearbox-coupled gear oil units remove carbon deposits directly from the sump",
      "EPT Canada chemistry for phosphate-ester and FRF: acid number held below 0.2 mg KOH/g",
      "Moisture held below 300–500 ppm and resistivity restored in EHC fluids",
      "Magnetix rare-earth separators: up to 8× ferrite force, dry cake discharge, no consumables",
      "Water-glycol units at 75 LPM and 16 bar working pressure",
      "Diesel-engine, hydraulic-motor and electric drive options",
      "Specified for steel, power, cement, heavy engineering, automotive and ports",
    ],
    models: [
      {
        name: "Gear Oil Filtration Unit",
        note: "Direct-coupled gearbox unit with 12 kW heater for heavy gear oils.",
        specs: {
          "Flow rate": "6,000 LPH",
          "Plant capacity": "1 KL",
          "Filter rating": "5 µm",
          "Heater capacity": "12 kW",
          "Drive option": "Diesel engine / electric",
          "Weight": "600 kg",
          "Element options": "1, 3, 5, 10, 25, 40 µm",
        },
      },
      {
        name: "MS6 DHU — Gearbox Magnetic Strainer Unit",
        note: "Magnet strainer plus mechanical filter, attaching directly to the gearbox to remove ferrous wear particles.",
        specs: {
          "Function": "Ferrous particle removal + mechanical filtration",
          "Mounting": "Direct to gearbox",
          "Application": "Gearbox oil conditioning",
        },
      },
      {
        name: "Magnetix Magnetic Separator",
        note: "Rare-earth magnetic separator for coolant and process fluid circuits.",
        specs: {
          "Flow range": "20–500 LPM",
          "Magnet type": "Rare-earth, up to 8× ferrite force",
          "Discharge": "Dry cake — no consumables",
          "Separates": "Carbide, scale and ferrous fines",
          "Applications": "Surface, centreless, internal/external and gear grinding, honing, superfinishing, EDM",
        },
      },
      {
        name: "EPT Canada System — Phosphate Ester / EHC",
        note: "Fire-resistant fluid conditioning built in India with EPT Canada acid-control resins.",
        specs: {
          "Fluid": "Phosphate ester, FRF, EHC",
          "Acid number maintained": "Below 0.2 mg KOH/g",
          "Moisture maintained": "Below 300–500 ppm",
          "Also restores": "Resistivity",
          "Removes": "Oxygen and combustible gases",
          "Benefit": "Eliminates servo-valve malfunction",
        },
      },
      {
        name: "EH Oil Filtration Unit",
        note: "For electro-hydraulic control oil in turbine systems.",
        specs: {
          "Capacity": "100 LPH",
          "Working pressure": "0.5 MPa",
          "Power": "15 kW",
          "Function": "Removes and maintains acid number",
          "Supply": "220 V / 415 V, 3 phase",
        },
      },
      {
        name: "Water Glycol Filtration Unit",
        note: "Two-stage unit built for water-glycol fire-resistant hydraulic fluid.",
        specs: {
          "Flow rate": "75 LPM",
          "Working pressure": "16 bar",
          "Filter rating": "10 µm",
          "Capacity": "Up to 100 LPH",
          "Motor power": "1.5 HP",
          "Stages": "Two stage",
        },
      },
      {
        name: "Hydraulic Oil Solid Removal Filtration Machine",
        note: "Rust-proof unit for bulk solid removal from hydraulic reservoirs.",
        specs: {
          "Capacity": "500 LPH",
          "Supply": "220 V, 3 phase / 50 Hz",
          "Construction": "Rust proof",
        },
      },
      {
        name: "Lube Oil Filtration Equipment",
        note: "Fine 3 µm polishing for circulating lube systems.",
        specs: {
          "Flow rate": "10–20 L/min",
          "Capacity": "250 LPH",
          "Filtration rating": "3 µm",
          "Mounting": "Portable",
          "Drive": "Hydraulic motor",
        },
      },
    ],
  },

  {
    slug: "mechanical-filtration",
    art: "hydraulic",
    name: "Two-Stage & Three-Stage Mechanical Filtration",
    short: "2-Stage & 3-Stage Filtration",
    series: "FRF / MS Series",
    group: "filtration",
    tagline: "Each element does one job, so all of them last longer",
    chips: ["2-stage & 3-stage", "1–40 µm elements", "Magnetic pre-strainer"],
    img: "filtration-unit.jpg",
    gallery: [
      { img: "filtration-unit", caption: "Two-stage filtration unit — magnetic strainer plus cartridge stage" },
      { img: "filter-elements", caption: "Element set — loaded pleated element, clean mesh element, magnetic rod" },
      { img: "collector-element", caption: "Pleated collector element after a service interval" },
      { img: "elc-3stage", caption: "Three-stage unit with bulk, fine and polishing stages" },
    ],
    summary:
      "Single-element filtration loads up fast and passes contamination the moment it does. Ferrocare builds two-stage and three-stage trains instead: a magnetic pre-strainer pins the ferrous fraction, a coarse element takes the bulk, and a fine element polishes. Staging multiplies element life and holds differential pressure low.",
    technology:
      "Oil is drawn from the reservoir and passed first through a high-intensity magnetic strainer, which pins ferrous wear debris out of the flow without any consumable at all. It then moves through progressively finer cartridge elements — typically a 25 or 40 µm bulk stage, then a 10 µm stage, then a 3 or 5 µm polishing stage. Because each element only sees contamination its rating can handle, none of them blinds off early. The result is low differential pressure, long service intervals and a consistent ISO cleanliness code at the outlet rather than one that drifts as the element loads.",
    highlights: [
      "Magnetic pre-strainer removes ferrous debris with no consumable",
      "Two-stage and three-stage cartridge trains built to the duty point",
      "Element ratings from 1, 3, 5, 10, 25 and 40 µm",
      "Cartridge working pressure 5–10 bar",
      "Low differential pressure maintained across the element life",
      "Trolley, portable and skid-mounted formats",
      "Also supplied as a dehydration unit with the filter train integrated (LVDH + mechanical filtration)",
    ],
    models: [
      {
        name: "Two-Stage Mechanical Filtration Unit",
        note: "Magnetic strainer plus a single cartridge stage — the standard offline filtration workhorse.",
        specs: {
          "Flow rate": "75 LPM",
          "Working pressure": "10 bar",
          "Filtration rating": "10 µm",
          "Motor power": "2 HP",
          "Stages": "Two stage",
          "Dimension": "740 × 710 × 920 mm",
          "Weight": "85 kg",
        },
      },
      {
        name: "Three-Stage Mechanical Filtration Unit",
        note: "Adds a polishing stage for cleanliness codes that a two-stage train cannot reach.",
        specs: {
          "Stages": "Three stage",
          "Filtration rating": "Down to 3 µm",
          "Element options": "1, 3, 5, 10, 25, 40 µm",
          "Motor power": "1.5 HP",
          "Application": "Circulating lube and hydraulic oil",
        },
      },
      {
        name: "Magnetic Strainer Unit",
        note: "High-intensity magnetic stage that removes ferrous wear debris with no filter element to replace.",
        specs: {
          "Function": "Ferrous particle removal",
          "Consumable": "None — magnetic element is cleaned and reused",
          "Mounting": "Inline or standalone",
          "Application": "Hydraulic, gear and coolant circuits",
        },
      },
      {
        name: "Water Glycol Filtration Machine",
        note: "Purpose-built for water-glycol fire-resistant hydraulic fluid, which standard filtration cannot handle.",
        specs: {
          "Flow rate": "75 LPM",
          "Working pressure": "16 bar",
          "Filter rating": "10 µm",
          "Capacity": "Up to 100 LPH",
          "Motor power": "1.5 HP",
          "Stages": "Two stage",
          "Fluid": "Water-glycol HFC fluid",
        },
      },
      {
        name: "Multistage Filtration Unit for FRF Oil",
        note: "Multi-stage train specified for fire-resistant fluid circuits in steel and power plants.",
        specs: {
          "Capacity": "800 LPH",
          "Fluid": "Fire-resistant hydraulic fluid",
          "Stages": "Multi-stage cartridge train",
          "Application": "Steel, power generation",
        },
      },
      {
        name: "LVDH with Mechanical Filtration",
        note: "Dehydration and a two- or three-stage filter train on one frame.",
        specs: {
          "Function": "Vacuum dehydration + multi-stage solid removal",
          "Filtration stages": "Two stage or three stage",
          "Element ratings": "1, 3, 5, 10, 25, 40 µm",
          "Final water": "10–20 ppm",
          "Mounting": "Skid or trolley",
        },
      },
    ],
  },
  {
    slug: "gearbox-oil-filtration",
    img: "ms6-dhu.jpg",
    gallery: [
      { img: "ms6-dhu", caption: "MS6 with DHU — magnetic strainer unit and its magnetic element" },
      { img: "gearbox-unit", caption: "Gearbox oil filtration system, direct-coupled to the housing" },
      { img: "magnetic-element", caption: "Magnetic element after one service interval — captured ferrous wear" },
      { img: "magnetic-element-2", caption: "Ferrous debris lifted out of a gearbox sump" },
    ],
    art: "gearbox",
    name: "Gear Box Oil Filtration Systems",
    short: "Gearbox Oil Filtration",
    series: "GB / MS6 DHU",
    group: "filtration",
    tagline: "Attach to the gearbox, lift the carbon out",
    chips: ["Direct gearbox coupling", "3,000 LPH", "No dismantling"],
    summary:
      "A dedicated system that couples straight onto gearbox housings and works the oil continuously. Carbon deposits and wear debris that settle in the sump are drawn out rather than left to recirculate through the bearings.",
    technology:
      "The unit connects directly to the gearbox drain and fill points, drawing oil from the low point of the sump where deposits accumulate. A magnetic strainer stage pins ferrous wear particles, and continuous circulation through the mechanical filter lifts carbonaceous sludge into suspension and captures it — all while the gearbox keeps running under load.",
    highlights: [
      "Connects directly to the gearbox — no dismantling required",
      "Removes carbon deposits far more effectively than drain-and-refill",
      "Magnet strainer plus mechanical filter in one unit (MS6 DHU)",
      "Continuous circulation while the gearbox stays in service",
      "3,000 LPH treatment capacity",
      "Specified for steel, power, cement, heavy engineering, automotive and ports",
    ],
    models: [
      {
        name: "Gear Box Oil Filtration System",
        note: "Skid or trolley unit coupled to the gearbox drain and fill ports.",
        specs: {
          "Capacity": "3,000 LPH",
          "Automation": "Automatic",
          "Power source": "Electric, 3 phase",
          "Application": "Filtration of gear oils",
          "Industries": "Steel, power, cement, heavy engineering, automotive, ports & shipping",
        },
      },
      {
        name: "MS6 DHU — Magnetic Strainer Unit",
        note: "Magnet strainer combined with a mechanical filter, mounted directly on the gearbox.",
        specs: {
          "Stages": "Magnetic strainer + mechanical filter",
          "Function": "Ferrous wear particle removal",
          "Mounting": "Direct to gearbox",
        },
      },
    ],
  },

  {
    slug: "coolant-filtration-systems",
    img: "filtration-unit.jpg",
    gallery: [
      { img: "filtration-unit", caption: "Coolant filtration unit for grinding and honing cells" },
      { img: "magnetic-element-2", caption: "Magnetically separated swarf and carbide fines" },
      { img: "install-6", caption: "Coolant system in service at a machine tool" },
      { img: "filter-elements", caption: "Filter elements and magnetic stage from a coolant circuit" },
    ],
    art: "coolant",
    name: "Coolant Filtration Systems",
    short: "Coolant Filtration",
    series: "CFS / Magnetix",
    group: "coolant",
    tagline: "Built for grinding — where swarf never stops coming",
    chips: ["400 LPM flow", "Grinding, honing & EDM", "Magnetix separator"],
    summary:
      "High-flow coolant filtration and magnetic separation for grinding cells. Systems that keep abrasive swarf, wheel grit and carbide fines out of the coolant, so surface finish and wheel life stay where they were specified.",
    technology:
      "Coolant returns from the machine carrying abrasive fines, wheel grit, carbide particles and tramp oil. The system settles, filters and — on Magnetix-equipped installations — magnetically separates the ferrous fraction using rare-earth magnets that develop up to eight times the force of conventional ferrite. Removing the fines is what protects surface finish, because recirculated grit scratches the workpiece just as surely as the wheel does.",
    highlights: [
      "400 LPM flow rate matched to grinding cell demand",
      "Built for surface, centreless, internal/external, gear and superfinish grinding",
      "Also specified for honing operations and EDM",
      "Magnetix separators discharge a dry cake — no filter consumables",
      "Keeps abrasive and carbide fines out of the cutting zone to protect surface finish",
      "Mild steel construction with 240 V / 415 V supply options",
    ],
    models: [
      {
        name: "Coolant Filtration System",
        note: "Central coolant filtration for grinding lines and honing cells.",
        specs: {
          "Flow rate": "400 LPM",
          "Capacity": "500 LPH",
          "Material": "Mild steel",
          "Supply": "240 V / 415 V",
          "Automation": "Automatic",
          "Applications": "Surface, centreless, internal/external and gear grinding, honing, superfinishing",
        },
      },
      {
        name: "Magnetix Magnetic Separator",
        note: "Rare-earth magnetic separation for grinding and EDM coolant circuits.",
        specs: {
          "Flow range": "20–500 LPM",
          "Magnet type": "Rare-earth — up to 8× ferrite force",
          "Discharge": "Dry cake, no consumables",
          "Separates": "Carbide, scale and ferrous fines",
          "Applications": "Grinding, honing, superfinishing, EDM",
        },
      },
    ],
  },

  {
    slug: "condition-monitoring",
    img: "opcom-handheld.jpg",
    gallery: [
      { img: "opcom-handheld", caption: "OPCOM offline particle counter — battery hand-set for plant surveys" },
      { img: "opcom-inline", caption: "OPCOM online counter reading live at system pressure" },
      { img: "sensor-head", caption: "Inline sensor head rated to 400 bar" },
      { img: "software", caption: "OPCOM reporting software — ISO, NAS and SAE codes with trend analysis" },
    ],
    art: "monitor",
    name: "Condition Monitoring Instruments",
    short: "Condition Monitoring",
    series: "OPCOM / PC9001 / S120",
    group: "monitoring",
    tagline: "Measure the oil instead of guessing about it",
    chips: ["Online to 400 bar", "ISO 4406 codes", "Wear-particle imaging"],
    summary:
      "The instrumentation half of the business. Online and portable particle counters, digital imaging analysers and inline moisture sensors that tell you what the oil actually is — so filtration decisions are made on data and oil changes happen when they are due, not on a calendar.",
    technology:
      "Optical particle counters size and count contamination in flowing oil and report it directly as ISO 4406, NAS 1638 or SAE AS4059 cleanliness codes. The OPCOM online counter reads live at pressures up to 400 bar. The S120 digital imaging analyser goes further: it photographs each particle from 4 to over 100 µm, classifies it by shape — fatigue, sliding or cutting wear, fibre, water, air bubble — and actively eliminates bubbles from the count. Inline capacitance moisture sensors report water in ppm and percent saturation over 4–20 mA or Modbus, and can be wired to start an LVDH or ELC automatically.",
    highlights: [
      "OPCOM online counter reads live at pressures up to 400 bar",
      "ISO 4406 / NAS 1638 / SAE AS4059 codes reported directly — no lab turnaround",
      "S120 digital imaging classifies wear-particle shape from 4 µm to over 100 µm",
      "Bubble elimination stops air being counted as contamination",
      "Inline moisture sensing in ppm and % saturation, 4–20 mA or Modbus",
      "Sensors can auto-start an LVDH or ELC when moisture rises",
      "SCADA, PC and PLC integration; RS232 and USB outputs",
    ],
    models: [
      {
        name: "OPCOM — Online Particle Counter",
        note: "Permanent online counter for live hydraulic and lube lines. Reads at full system pressure with no sampling required.",
        specs: {
          "Type": "Liquid particle counter",
          "Bar pressure": "Up to 400 bar",
          "Flow": "500 ml/min",
          "Output codes": "ISO 4406 · NAS 1638 · SAE AS4059",
          "Application": "Industrial and laboratory",
          "Automation": "Automatic",
          "Mounting": "Inline / permanent",
        },
      },
      {
        name: "OPCOM — Offline / Portable Particle Counter",
        note: "Battery hand-set for spot checks across a plant. Sample bottles are read directly, so one instrument surveys every machine on site.",
        specs: {
          "Format": "Portable, rechargeable",
          "Output codes": "ISO 4406 · NAS 1638 · SAE AS4059",
          "Sampling": "Bottle sample, offline",
          "Display": "Onboard, with data logging",
          "Software": "PC reporting and trend analysis",
          "Application": "Plant-wide condition survey",
        },
      },
      {
        name: "PC9001 — Laser Online Particle Counter",
        note: "Online laser counter reporting ISO, NAS and SAE codes directly.",
        specs: {
          "Type": "Laser online particle counter",
          "Output codes": "ISO 4406 · NAS 1638 · SAE AS4059",
          "Data interface": "RS232",
          "Mounting": "Inline / online",
        },
      },
      {
        name: "S120 / S120-LCD — Digital Imaging Particle Counter",
        note: "Images each particle rather than only counting it, so wear mode is identified — fatigue, sliding or cutting — and entrained air is excluded from the result.",
        specs: {
          "Measurement range": "4 µm to above 100 µm",
          "Size classes": "4, 6, 14, 21, 38, 70, >100 µm",
          "Classifies": "Fatigue, sliding and cutting wear, fibres, water, air bubbles",
          "Wear debris analysis": "Particle shape and type recognition",
          "Output codes": "ISO 4406 · NAS 1638 · SAE AS4059",
          "Calibration": "Self-calibrating",
          "Integration": "SCADA, PC and PLC",
        },
      },
      {
        name: "Particle Counter with Printer",
        note: "Portable unit with colour TFT display and onboard printing.",
        specs: {
          "Channel size": "0.5 µm",
          "Display": "TFT colour",
          "Weight": "6.2 kg",
          "Dimensions": "400 × 200 × 83 mm",
          "Supply": "36 VDC",
          "Mounting": "Portable",
        },
      },
      {
        name: "Portable Oil & Fuel Cleanliness Monitor",
        note: "Battery field monitor combining a particle counter with an optional water sensor — for oil and fuel.",
        specs: {
          "Counter": "PC9001 particle counter",
          "Water sensor": "WMS500 (% RH or ppm variants)",
          "Output codes": "ISO 4406 (4/6/14/21 µm) · SAE 4059 · NAS 1638",
          "Viscosity range": "1–424 cSt",
          "Weight": "5.5 kg",
          "Closed dimensions": "360 W × 290 D × 170 H mm",
          "Runtime": "Up to 6 hours · 5 hour charge",
          "Variants": "Base · W (% RH water) · PPM (ppm water)",
        },
      },
      {
        name: "Moisture Detector / Oil Moisture Sensor",
        note: "Inline capacitance sensor reporting water in ppm and % saturation; can auto-start dehydration.",
        specs: {
          "Principle": "Capacitance",
          "Output": "ppm and % saturation (or water activity)",
          "Interface": "4–20 mA / Modbus",
          "Measuring range": "1 aw",
          "Temperature range": "80 °C",
          "Integration": "Auto-start trigger for LVDH and ELC units",
        },
      },
    ],
  },

  {
    slug: "oil-testing-kits",
    img: "test-report.jpg",
    gallery: [
      { img: "test-report", caption: "ELC test report with patch-test membranes and reference chart" },
      { img: "oil-samples", caption: "Sample bottles from a condition assessment — three oils, three verdicts" },
      { img: "collector-element", caption: "Collector element showing what the patch test predicted" },
      { img: "varnish", caption: "Varnish deposit on a metal surface, invisible to mechanical filtration" },
    ],
    art: "kit",
    name: "Oil Testing Kits",
    short: "Oil Testing Kits",
    series: "Patch Test",
    group: "monitoring",
    tagline: "A laboratory verdict, from a bench in the plant",
    chips: ["0.8 µm membranes", "Water, TAN, viscosity", "18-month shelf life"],
    summary:
      "Field diagnostic kits that turn an oil sample into an answer in minutes. Patch tests, contamination checks and combination kits covering water content, particle count, viscosity, TAN, acidity and dielectric strength — pass/fail, numeric or colour-compare.",
    technology:
      "The patch test forces a measured volume of oil through a fine 0.8 µm membrane and compares the residue against a standard reference chart, graded at 10, 4, 2, 1 and 0.5 mg per 100 ml. Combination kits extend this with chemical test strips for pH, iron, chloride and salt, and with glassware for water content, viscosity, TAN and dielectric checks. Ferrocare also runs on-site patch-testing and reporting as a service. Everything needed travels in one portable set.",
    highlights: [
      "Patch test read against a graded reference chart — pass/fail or colour compare",
      "0.8 µm membranes with reference levels at 10, 4, 2, 1 and 0.5 mg per 100 ml",
      "Covers cooking, lube, engine, transformer, hydraulic and gear oils",
      "Test parameters: water content, particle count, viscosity, moisture, dielectric, TAN, acidity",
      "Supplied with pipette set, syringe set, glassware and chemicals",
      "18-month shelf life; suited to service centres, industry and laboratories",
      "On-site patch testing and reporting available as a Ferrocare service",
    ],
    models: [
      {
        name: "Contaminated Oil Patch Test Kit",
        note: "The core field kit for solid particulate, sludge and varnish assessment.",
        specs: {
          "Kit type": "Portable set",
          "Membrane": "0.8 µm",
          "Reference levels": "10 / 4 / 2 / 1 / 0.5 mg per 100 ml",
          "Sampling": "Bottle sample",
          "Result type": "Pass/fail, numeric, colour compare",
          "Test parameters": "Water content, particle count, viscosity, moisture, dielectric, TAN",
          "Supplied items": "Pipette set, syringe set, glassware",
          "Shelf life": "18 months",
        },
      },
      {
        name: "Oil Contamination Testing Kit",
        note: "Chemical test-strip kit for acidity, TAN, viscosity and water content.",
        specs: {
          "Kit type": "Portable set",
          "Sampling": "Syringe sample",
          "Test parameters": "TAN, viscosity, acidity, water content",
          "Supplied items": "Glassware, chemicals, syringe set",
          "Oils": "Transformer, engine, hydraulic",
          "Shelf life": "18 months",
        },
      },
      {
        name: "Surface Contamination Test Strips",
        note: "Test strips for surface contamination checks on components and assemblies.",
        specs: {
          "Measures": "pH, iron (ferrous ion), chloride, salt",
          "Format": "Test strips",
          "Usage level": "Service centre, industrial, laboratory",
        },
      },
      {
        name: "Contamination Oil Testing Kit (Combination)",
        note: "Combined bench kit for contamination testing across oil types.",
        specs: {
          "Material": "MS",
          "Supply": "220 V / 50 Hz electric",
          "Application": "Oil testing",
        },
      },
    ],
  },

  {
    slug: "consumables-spares",
    img: "filter-elements.jpg",
    gallery: [
      { img: "filter-elements", caption: "Genuine consumables — pleated element, mesh strainer and magnetic rod" },
      { img: "collector-element", caption: "Cellulose collector element for ELC machines" },
      { img: "magnetic-element", caption: "Magnetic element, cleaned and reused — no consumable" },
      { img: "collector-loading", caption: "Collector media being loaded into an ELC machine" },
    ],
    art: "consumable",
    name: "Consumables, Spares & Tool Steels",
    short: "Consumables & Steels",
    series: "Spares & Nachi",
    group: "consumable",
    tagline: "The parts that keep a filtration programme running",
    chips: ["Genuine ELC media", "126 m² filter area", "Nachi M2 / M35 / M42"],
    summary:
      "Genuine collector media and filter elements for installed Ferrocare machines, and the Nachi high-speed steel and abrasive ranges handled by Ferrocare International. Keeping the right consumable on the shelf is what makes an oil-cleaning programme continuous rather than occasional.",
    technology:
      "ELC machines collect contamination on cellulose collector paper, which loads up and is replaced. Using the specified media preserves collection efficiency and airflow. Through Ferrocare International the company also represents Japanese manufacturers — Nachi-Fujikoshi high-speed steels and hydraulics, Noritake abrasives, and Chuetsu copper moulds — supplying hardened HSS bar, P/M wire, cemented carbide wire and CBN products to tooling and automotive customers.",
    highlights: [
      "Genuine ELC collector paper in cellulose media for correct collection efficiency",
      "126 m² filtering area with high dust-holding capacity and good air permeability",
      "Nachi hardened HSS bar 0.20–16 mm diameter in 2 m lengths",
      "Grades M2, M35, M42 and ASP, plus hardened stainless SUS420JS",
      "P/M high-speed steel wire and cemented carbide wire down to 0.04 mm",
      "Noritake ceramic and CBN abrasives, and Chuetsu copper moulds",
      "Ferrocare International represents Nachi-Fujikoshi, Noritake and Chuetsu in India",
    ],
    models: [
      {
        name: "Dust Collector Paper for ELC Machines",
        note: "Cellulose collector media — the consumable that makes electrostatic cleaning work.",
        specs: {
          "Filter media": "Cellulose",
          "Filtering area": "126 m²",
          "Air flow rate": "3,000 m³/hr",
          "Number of filters": "Above 50",
          "Collector type": "Portable collector",
          "Frequency": "50 Hz",
          "Country of origin": "Made in India",
        },
      },
      {
        name: "Nachi High Speed Steels",
        note: "Hardened high-speed steel bar for cutting tools, punches, ejector pins and vanes.",
        specs: {
          "Grades": "M2 / M35 / M42 & ASP",
          "Diameter range": "0.20 mm to 16 mm",
          "Length": "2,000 mm",
          "Co content": "5 % Co",
          "Applications": "Cutting tools, punches, ejector pins, knives, pump and compressor vanes, surgical drills, EDM wire",
        },
      },
      {
        name: "Nachi Micron Hard — P/M & Carbide Wire",
        note: "Powder-metallurgy high-speed steel wire and cemented carbide wire for fine tooling.",
        specs: {
          "P/M HSS wire": "0.04–0.4 mm, 900–950 HV",
          "Cemented carbide wire": "0.05–0.8 mm, 1,250–1,850 HV",
          "Route": "Powder metallurgy",
        },
      },
      {
        name: "High Speed Steel Rod",
        note: "M42 rod supplied ground, in round, flat and square sections.",
        specs: {
          "Grade": "M42",
          "Diameter": "8 mm",
          "Hardness": "60–64 HRC",
          "Length": "2,000 mm (under 3 m)",
          "Supply condition": "Ground",
          "Shape": "Round / flat / square",
        },
      },
      {
        name: "Hardened Stainless & Special Steels",
        note: "Hardened stainless bar and alloy steel products.",
        specs: {
          "Stainless": "SUS420JS, 1–13 mm",
          "Form": "Hardened bar",
          "Applications": "Tooling and automotive components",
        },
      },
    ],
  },
];

/* ==========================================================================
   Services
   ========================================================================== */
export const services = [
  {
    art: "elc",
    title: "On-site Oil Cleaning & Dehydration",
    tag: "On-site",
    body: "Bring a Ferrocare machine to your reservoir instead of buying one. Electrostatic cleaning, vacuum dehydration, or the integrated process — executed on site by our engineers, with cleanliness readings before and after.",
    points: [
      "Pre- and post-service ISO 4406 cleanliness readings",
      "Electrostatic cleaning to 1 micron and below",
      "Vacuum dehydration — water content cut 0.25–1.5 % per pass",
      "Ideal for commissioning, post-repair and shutdown windows",
    ],
  },
  {
    art: "monitor",
    title: "Oil Analysis & Condition Assessment",
    tag: "Diagnostic",
    body: "Sampling, particle counting, digital imaging, patch testing and moisture measurement that tell you the true condition of the oil — and whether it can be recovered or should be replaced.",
    points: [
      "Particle count and ISO 4406 / NAS / SAE cleanliness code reporting",
      "Wear-particle imaging that classifies fatigue, sliding and cutting wear",
      "Water content, viscosity, TAN, acidity and dielectric testing",
      "On-site patch testing with a written report",
      "Recommendation: clean, reclaim or replace",
    ],
  },
  {
    art: "plant",
    title: "Custom Engineered Systems",
    tag: "Turnkey",
    body: "Most of what Ferrocare ships is not a catalogue item. Flow rate, viscosity, water load, fluid chemistry, footprint and control philosophy are engineered to the duty point and built to order.",
    points: [
      "Sizing against flow rate, viscosity and contamination load",
      "Skid, trolley or stationary formats in MS or SS",
      "EPT Canada acid-control chemistry for phosphate-ester and FRF",
      "Custom automation, interlocks and control panel integration",
      "IoT and MODBUS connectivity on the R-series",
    ],
  },
  {
    art: "hydraulic",
    title: "Retrofits & System Integration",
    tag: "Integration",
    body: "Filtration added to machines and systems that were never specified with it — kidney-loop circuits, offline filtration on existing reservoirs, and gearbox or EH oil circuits tied into plant control.",
    points: [
      "Offline / kidney-loop filtration on existing reservoirs",
      "Direct gearbox coupling without dismantling",
      "EH, phosphate-ester and water-glycol circuit integration",
      "Moisture sensors wired to auto-start dehydration",
      "Piping, wiring and commissioning included",
    ],
  },
  {
    art: "consumable",
    title: "Consumables, Spares & AMC",
    tag: "Support",
    body: "Element and collector-media supply, genuine spares, and annual maintenance contracts that keep installed machines performing to their original specification.",
    points: [
      "Genuine ELC collector paper and filter elements from 1 to 40 µm",
      "Scheduled preventive maintenance visits",
      "Performance verification against original specification",
      "Priority breakdown support on installed equipment",
    ],
  },
  {
    art: "coolant",
    title: "Coolant & Process Fluid Management",
    tag: "Process",
    body: "Coolant filtration and magnetic separation specification and support for grinding, honing and EDM cells — where keeping abrasive fines out of the cutting zone is what protects surface finish.",
    points: [
      "Central coolant filtration system design",
      "Magnetix rare-earth separation — dry cake, no consumables",
      "Swarf, carbide and tramp-oil separation",
      "Sizing for surface, centreless, gear and superfinish grinding",
    ],
  },
];

/* ==========================================================================
   Industries
   ========================================================================== */
export const industries = [
  {
    art: "gear",
    name: "Steel & Rolling Mills",
    body: "Mill hydraulics, gearbox lube circuits and fire-resistant fluids see heavy water ingress and metallic wear. Dehydration, acid control and electrostatic cleaning keep control systems responsive under continuous duty.",
    needs: ["EPT / FRF acid control", "Gearbox oil filtration", "Water-glycol units", "ELC electrostatic cleaners"],
  },
  {
    art: "plant",
    name: "Power Generation",
    body: "Turbine lube oil and EH control oil degrade slowly and expensively. Degassification and dehydration restore specification rather than replacing several thousand litres of oil.",
    needs: ["LVDH degassification units", "EH oil filtration", "Phosphate-ester conditioning", "Moisture sensing"],
  },
  {
    art: "hydraulic",
    name: "Automotive & Auto Components",
    body: "Injection moulding, press and machining hydraulics run servo valves with micron-level clearances. Electrostatic cleaning is what keeps those valves from sticking and drifting.",
    needs: ["Injection moulding filtration", "ELC electrostatic cleaners", "Coolant filtration", "Patch test kits"],
  },
  {
    art: "coolant",
    name: "Machine Tools & Grinding",
    body: "Surface finish is decided by what is circulating in the coolant. High-flow filtration and magnetic separation keep abrasive and carbide fines out of the cutting zone.",
    needs: ["Coolant filtration systems", "Magnetix separation", "Honing & superfinishing filtration", "Tramp oil removal"],
  },
  {
    art: "gearbox",
    name: "Cement & Heavy Engineering",
    body: "Large gearboxes, kiln drives and crusher hydraulics operate in dust-heavy environments where contamination ingress never stops.",
    needs: ["Gearbox oil filtration", "Gear oil filtration units", "Bulk solid removal", "On-site cleaning service"],
  },
  {
    art: "monitor",
    name: "Ports, Shipping & Marine",
    body: "Remote duty points and expensive downtime make condition monitoring essential. Portable instruments let one engineer survey an entire fleet or terminal.",
    needs: ["Portable cleanliness monitors", "On-site service", "Gearbox filtration", "Oil testing kits"],
  },
  {
    art: "plant",
    name: "Plastics & Injection Moulding",
    body: "Servo-hydraulic moulding machines are unforgiving about oil cleanliness. Varnish deposits on valve spools cause drift, scrap and unplanned stoppages.",
    needs: ["ELC electrostatic cleaners", "Injection moulding filtration", "Patch test kits", "Varnish removal"],
  },
  {
    art: "monitor",
    name: "Defence, Aerospace & Ordnance",
    body: "Test rigs, ground support equipment and ordnance plant hydraulics demand documented cleanliness. Ferrocare equipment and test kits are used across Indian defence establishments.",
    needs: ["ELC electrostatic cleaners", "Oil testing kits", "Condition monitoring", "Custom engineered units"],
  },
];

/* ==========================================================================
   Differentiators
   ========================================================================== */
export const differentiators = [
  {
    art: "elc",
    title: "Sub-micron without chemistry",
    body: "Electrostatic collection removes sludge and varnish that mechanical filters cannot see, and does it without disturbing the additive package. The oil goes back into service unchanged — just cleaner. The technology was licensed from Kleentek of Japan and refined over four decades.",
  },
  {
    art: "lvdh",
    title: "Water out, oil kept",
    body: "Under vacuum, water boils below 53 °C — well inside what the oil tolerates. That means no burn-off, no oxidation and no additive depletion, so turbine and hydraulic oil that would be written off returns to 10–20 ppm water instead.",
  },
  {
    art: "plant",
    title: "Built to the duty point",
    body: "Flow rate, viscosity, water load, fluid chemistry and footprint are engineered per application. Machines ship skid- or trolley-mounted, in MS or SS, with EPT Canada acid-control chemistry where phosphate-ester fluids demand it.",
  },
  {
    art: "monitor",
    title: "Decisions backed by measurement",
    body: "Ferrocare supplies the instruments as well as the machines — including digital imaging that classifies wear-particle shape. Cleanliness codes and moisture readings are what justify a filtration programme, and prove it worked.",
  },
];

export const milestones = [
  {
    year: "1980",
    era: "The beginning",
    icon: "file",
    title: "Incorporated in Pune",
    body:
      "Ferrocare Machines Private Limited is registered in Maharashtra as a manufacturer of oil purification equipment. The company's own literature also cites 1981 as its inception year for trading operations — the two dates have sat side by side in its records ever since.",
    stat: { v: "U29299MH1980", l: "CIN registration" },
  },
  {
    year: "1981–89",
    era: "Trading, then making",
    icon: "wrench",
    title: "Manufacturing under Kleentek licence",
    body:
      "The company begins by trading Japanese machines and servicing them, then sets up its own manufacturing under licence from Kleentek of Japan. Sales and service offices follow in Mumbai, Delhi, Daman and Bangalore — the network that still carries the ELC range today.",
    stat: { v: "Kleentek, Japan", l: "Technology licence" },
  },
  {
    year: "1990s",
    era: "The core product",
    icon: "bolt",
    title: "The ELC range scales up",
    body:
      "Electrostatic liquid cleaners become the core of the business and grow into a ten-model range, from the compact ELC 8 LP to the R 600 that maintains 1,20,000 litres of VG 32 oil. The machines go into steel mills, power stations and automotive lines across India.",
    stat: { v: "1,000+", l: "ELC units in India" },
    img: "elc-machine",
    alt: "Ferrocare ELC electrostatic liquid cleaner",
  },
  {
    year: "2000s",
    era: "Water and heavy industry",
    icon: "snow",
    title: "Low vacuum dehydration",
    body:
      "The LVDH range is developed and applied to turbine, gear and hydraulic oils where water ingress was writing off thousands of litres of oil. Phosphate-ester technology follows from EPT of Canada, holding acid number below 0.2 mg KOH/g in fire-resistant turbine control circuits.",
    stat: { v: "10–20 ppm", l: "Final water content" },
    img: "lvdh-machine",
    alt: "Ferrocare LVDH low vacuum dehydration machine",
  },
  {
    year: "2010s",
    era: "Measure, don't guess",
    icon: "gauge",
    title: "Instrumentation completes the loop",
    body:
      "Online particle counters rated to 400 bar, digital imaging analysers that classify wear-particle shape, and inline moisture sensors that start a dehydrator automatically. Ferrocare stops only cleaning oil and starts proving what the cleaning achieved.",
    stat: { v: "400 bar", l: "Online counter rating" },
    img: "opcom-inline",
    alt: "OPCOM online particle counter reading a live ISO cleanliness code",
  },
  {
    year: "Today",
    era: "Connected and integrated",
    icon: "layers",
    title: "IoT-enabled and integrated",
    body:
      "The R-series ELC units ship IoT enabled with MODBUS output, streaming live condition data to a PC or handset. The I-series puts electrostatic cleaning and vacuum dehydration on one frame with a self-diagnostic touchscreen — and the catalogue now runs to eleven families and 62 documented models.",
    stat: { v: "62", l: "Documented models" },
    img: "elc-2stage",
    alt: "Integrated ELC and LVDH system",
  },
];

/* ==========================================================================
   FAQ
   ========================================================================== */
const P = (...xs) => xs.map((x) => `<p>${x}</p>`).join("");
const L = (...xs) => `<ul>${xs.map((x) => `<li>${x}</li>`).join("")}</ul>`;
export const faqs = [
  {
    q: "Why does oil get contaminated?",
    a: P("Oil gets contaminated by:") + L("Particles entering the oil", "Thermal degradation forming polymer products, resinous matter and sludge") +
       P("Sources for particles to enter the oil are:") +
       L("Initial load when the system is assembled — like dust and debris in pipes, reservoirs, and the first fill of oil itself (from barrels at NAS 10–12)",
         "From breathers, since systems are air compensated",
         "Wear particles from moving parts — fine metal, rubber",
         "Repair of parts and break-in of systems for replacement of parts, filters, seals etc.") +
       P("Oil undergoes a thermal cycle, where local temperatures at the work may rise to 60 °C and it is later cooled in heat exchangers. This leads to polymerisation, especially in the presence of catalysts like fine metal particles and moisture. Moisture and wear particles both contribute to degradation of oil, measured as the Total Acid Number."),
  },
  {
    q: "Why does machine breakdown occur?",
    a: P("Breakdown can be due to:") +
       L("Increased clearances between mating parts (due to wear).",
         "Blocked oil passages, especially at bends, valves and orifices.",
         "Clogged filters leading to cavitation (suction side), pressure and flow surges (pressure side) and consequent vibration and jerky operation.",
         "High acid value leading to corrosion and degradation of rubber parts."),
  },
  {
    q: "Why does oil leak?",
    a: P("We have discussed above how contaminants like wear particles are generated and contribute to increasing formation of sludge and resinous matter.",
         "Sludge, being acidic, attacks and reduces the life of oil seals. Sludge has an electrochemical attraction to metal surfaces and will deposit on oil coolers, reducing heat transfer efficiency. This hard scale is just the same persistent grime in ovens and pans (like the blackening of a pan or tawa). This leads to increased operating temperature, reduced viscosity and consequently higher leakage.",
         "It is generally thought that oil leakage is independent of oil contamination. Our studies prove that leakage is mainly due to oil contamination, with sludge being the prime contributor."),
  },
  {
    q: "Why does oil temperature increase?",
    a: P("Generally, 10–15% of electrical energy input from motors gets converted to heat energy.",
         "This percentage can increase when contamination increases, say by increased pumping energy required to push oil through choked filters. When suction side filters are choked, there is pump cavitation and aeration. Pumping energy is still higher as suction pressure drops while final pressures still have to be maintained. Moreover, aeration contributes to an effect known as “dieseling” whereby oil ignites at the high pressure side when air is available.",
         "This leads to build-up of oxidation products, like sludge. Sludge in turn deposits on heat exchange surfaces on oil coolers, reducing heat transfer and increasing operating temperatures on both oil and water sides. Higher water temperatures lead to increased scaling on the water side… and a chain reaction is set in place.",
         "Running machines at oil temperature between 43 °C – 48 °C is important. The focus has hitherto been to keep oil “cool”. It is however pertinent to understand what “cool” implies. Below 43 °C is too cool and above 48 °C is too hot.",
         "It is also important to note that oil oxidation (i.e. sludge formation) is accelerated when temperature exceeds 50 °C. Salt release from water (leading to scale formation) is also accelerated when temperature exceeds 50 °C.",
         "<strong>Therefore, keeping oil temperature below 50 °C is critical.</strong>"),
  },
  {
    q: "Why is oil change necessary?",
    a: P("Oil change is necessary when oil condition, indicated by turbidity or blackening, worsens enough to cause operating problems like sticky movement, hunting, slow pressure build-up, high leakages etc.",
         "The need for oil change can also be dictated by oil analysis reports when periodic testing is done. If parameters like acid value and solid content exceed limits set by the oil supplier, the oil has to be changed.",
         "Accidental ingress of water can also necessitate oil change, as a water–oil mixture cannot support hydrodynamic loads and prevent metal-to-metal contact at moving / meshing parts.",
         "Use of our Vacuum Dehydration equipment <a href=\"product-low-vacuum-dehydration.html\">LVDH-600</a> is the method which can perform water removal online.",
         "Use of <a href=\"product-electrostatic-liquid-cleaners.html\">ELC</a> to remove solids and oxidation products can prolong intervals between oil changes. In fact, if ELC is dedicated to a system and oil condition is monitored with membrane patches or particle counts, oil life can be prolonged indefinitely and oil becomes an asset rather than a consumable."),
  },
  {
    q: "Why is oil change necessary in spite of using mechanical filters? (Filters and centrifuges)",
    a: P("Both filters and centrifuges have a limitation that they cannot adequately remove smaller particles. Yet it is contaminants below 5 microns, known as “silt”, which are most harmful to the system. Smaller particles alone can enter the clearances in mating parts and have the capacity to increase erosive wear and also catalyse oxidation.",
         "Silt particles exist in much larger numbers and over time, as these particles remain in the oil, they contribute significantly to build-up of sludge and resinous matter and act as catalysts to increase the acid number of the oil.",
         "These oxidation products are the main cause of:") +
       L("Sticking of hydraulic valves", "Wear and breakdown of pumps, cylinders", "Increased seal failures", "Increased wear on mating parts, causing heavy leakages") +
       P("Therefore, as oil gets more contaminated and oxidised we have to change the oil… only a few dozen parts per million of oxidised matter and contaminants can dictate the need to change oil.",
         "<strong>Only electrostatic cleaning removes fine particles, the cause of sludge formation, and also the oxidised matter.</strong> Oil cannot be maintained with mechanical filtration at the level necessary to prevent costly oil change and downtime."),
  },
  {
    q: "What is oil deterioration?",
    a: P("An analysis of “deteriorated” oil proves that when oil is contaminated, its physical characteristics are not changed. Only a tiny percentage of oil molecules chemically react in the oxidation process and produce a resinous matter, which is generally referred to as “sludge”. (Mud in water indicates that water is contaminated; it does not however alter the basic molecular structure of water.)",
         "Oil is said to have deteriorated when a few dozen PPM of resinous matter exist in the oil. A relatively high acid value is measured in such oil, and resinous matter of light brown colour is deposited on a 0.8-micron membrane patch when oil is checked by the membrane analysis method. Resinous matter is soluble in oil at temperatures higher than 60 °C and remains insoluble at temperatures lower than 60 °C. Resinous matter is also measured as benzene insoluble.",
         "This resinous matter or sludge passes through filters when its concentration is small but clogs filters when its concentration increases. This is deteriorated oil — and it affects the hydraulic system because sludge is sticky in nature and is easily deposited on metallic surfaces of valves, oil coolers and pipes, leading to malfunctions or sticky valves, increased machine working temperatures, oxidation of oil, and decrease in viscosity."),
  },
  {
    q: "What are the properties of oils used in hydraulics and lubrication?",
    a: P("Hydraulics is based on Pascal's Law applied to liquids. Lubrication is based on separation of moving / meshing parts by an oil film. Oil is used only for transmission of energy and lubrication of mating parts.",
         "The basic property of oil that is exploited for use in hydraulic and lubrication systems is its <strong>viscosity</strong>. Viscosity of the oil permits the build-up of a thin load-bearing film of oil between moving parts, preventing metal-to-metal contact.",
         "Viscosity of oil is temperature dependent and the standard of measurement is at 40 °C. This value is used in design of systems, and using oil at temperatures far above or far below 40 °C are both “off design” situations.",
         "<strong>The other properties required to be monitored are:</strong>") +
       L("Total Acid Number", "Contaminants", "Moisture") +
       P("<strong>Acid number</strong> is a measure of the oxidation the oil has undergone.",
         "<strong>Contaminants</strong> in oil are measured by:") +
       L("<strong>Particle counting:</strong> This equipment automatically counts and records the number of particles in oil by electronic sensors. It cannot read contaminants below 5 microns in size, is expensive and requires trained personnel for operation.",
         "<strong>Membrane filter:</strong> This method is very reliable and contaminants in oil can be observed by the naked eye. Membrane patches of oils to be checked can be compared with standard patches. If required, membranes can be weighed before and after the oil sample is passed to arrive at the weight of contaminants in a given oil sample. 0.8-micron membranes are used for oil analysis by this method. This equipment is inexpensive, easy to operate and is portable.",
         "<strong>Turbidity measurement:</strong> The turbidity of an oil sample is measured by an electric meter and compared with that of standard purity. This instrument is very easy to operate and is inexpensive.") +
       P("<a href=\"product-electrostatic-liquid-cleaners.html\">ELC</a> is the best method of contamination control, removing all particles as well as oxidation products.",
         "<strong>Moisture</strong> must generally be controlled within a couple of hundred ppm, preferably within the saturation limit of the oil. Moisture is harmful by itself, causing breakdown of the oil film at the minimum and corrosion at higher values. It is also a catalyst for oxidation of the oil. Moisture is the biggest enemy of oil, especially emulsified water.",
         "Our <a href=\"product-low-vacuum-dehydration.html\">LVDH 600</a> is the best method of online moisture removal, and can reduce moisture content to below the saturation limit without taking the oil to high temperatures."),
  },
];


/* ==========================================================================
   Website product line-up — only these six, in this order
   ========================================================================== */
const pick = (slug) => allFamilies.find((f) => f.slug === slug);
const modelFrom = (slug, name) => pick(slug).models.find((m) => m.name === name);
const CM = pick("condition-monitoring");
const KITS = pick("oil-testing-kits");

export const families = [
  pick("electrostatic-liquid-cleaners"),
  pick("low-vacuum-dehydration"),
  pick("gearbox-oil-filtration"),
  {
    slug: "magnetic-separator",
    img: "magnetic-element.jpg",
    gallery: [
      { img: "magnetic-element", caption: "Magnetic element after one service interval — captured ferrous wear" },
      { img: "magnetic-element-2", caption: "Ferrous fines and swarf lifted out by the magnetic stage" },
      { img: "ms6-dhu", caption: "MS6 magnetic strainer unit with its magnetic element" },
      { img: "filter-elements", caption: "Magnetic rod alongside mechanical filter elements" },
    ],
    art: "coolant",
    name: "Magnetic Separator",
    short: "Magnetic Separator",
    series: "Magnetix",
    group: "filtration",
    tagline: "Rare-earth magnets that pull out what filters miss",
    chips: ["20–500 LPM", "8× ferrite force", "No consumables"],
    summary:
      "Magnetix rare-earth magnetic separators remove ferrous fines, carbide and scale from coolants, cutting oils and hydraulic fluid — with a dry-cake discharge and no filter consumables to replace.",
    technology:
      "Contaminated fluid passes through a high-intensity field generated by rare-earth magnets that develop up to eight times the force of conventional ferrite magnets. Ferrous particles — and even weakly magnetic material such as carbide and scale — are held on the magnetic drum or rod and discharged as a dry cake. Because nothing is consumed, running cost stays close to zero while surface finish, wheel life and fluid life improve.",
    highlights: [
      "Rare-earth magnets — up to 8× the force of conventional ferrite",
      "Separates ferrous fines, carbide and scale",
      "Dry-cake discharge — no filter consumables",
      "Flow range 20–500 LPM",
      "Improves surface finish and grinding-wheel life, reduces dressing frequency",
      "For grinding, honing, superfinishing, EDM, cutting oils and washing fluids",
    ],
    models: [
      modelFrom("coolant-filtration-systems", "Magnetix Magnetic Separator"),
      modelFrom("mechanical-filtration", "Magnetic Strainer Unit"),
    ],
  },
  {
    ...CM,
    slug: "oil-test-equipment",
    gallery: [CM.gallery[0], CM.gallery[1], KITS.gallery[0], KITS.gallery[1]],
    name: "Oil Test Equipment",
    short: "Oil Test Equipment",
    series: "OPCOM / Patch Test Kits",
    group: "monitoring",
    tagline: "Measure the oil instead of guessing about it",
    chips: ["Online to 400 bar", "ISO 4406 codes", "Patch test kits"],
    summary:
      "Particle counters, moisture sensors and field test kits that tell you the true condition of your oil — so filtration decisions are made on data, and oil is changed only when it is actually due.",
    technology: CM.technology + " For quick checks in the field, patch test kits force a measured volume of oil through a 0.8 µm membrane and compare the residue against a graded reference chart.",
    highlights: [...CM.highlights.slice(0, 4), KITS.highlights[0], KITS.highlights[3]],
    models: [...CM.models, ...KITS.models],
  },
  {
    slug: "ept-machines",
    img: "elc-3stage.jpg",
    gallery: [
      { img: "elc-3stage", caption: "Skid-mounted fluid conditioning unit" },
      { img: "controller", caption: "Control panel with live readings" },
      { img: "filter-elements", caption: "Filtration elements for particulate and gel removal" },
      { img: "install-3", caption: "Unit in service at a power plant" },
    ],
    art: "plant",
    name: "EPT Machines",
    short: "EPT Machines",
    series: "EPT Canada",
    group: "oil",
    tagline: "Acid control for fire-resistant fluids",
    chips: ["Acid < 0.2 mg KOH/g", "Moisture < 500 ppm", "EPT Canada resins"],
    summary:
      "Conditioning systems for phosphate-ester, FRF and EHC fire-resistant fluids. Built in India with critical acid-control resins from EPT, Canada — keeping acid number, moisture and resistivity in specification so servo valves keep working.",
    technology:
      "Phosphate-ester fluids break down in service, forming acids, gels and sludge that attack servo valves and lower resistivity. EPT units circulate the fluid through acid-control resin media from EPT Canada, holding the acid number below 0.2 mg KOH/g, while filtration removes particulate and insoluble gel. Moisture is held below 300–500 ppm, and oxygen and combustible dissolved gases are removed — restoring the fluid instead of replacing it.",
    highlights: [
      "Acid number maintained below 0.2 mg KOH/g",
      "Moisture maintained below 300–500 ppm",
      "Restores fluid resistivity",
      "Removes oxygen and combustible dissolved gases",
      "Removes particulate and insoluble gel / sludge",
      "Eliminates servo-valve malfunction in EHC circuits",
    ],
    models: [
      modelFrom("oil-filtration-plants", "EPT Canada System — Phosphate Ester / EHC"),
      modelFrom("oil-filtration-plants", "EH Oil Filtration Unit"),
    ],
  },
];

/* --------------------------------------------------------------------------
   ELC page — content supplied by Ferrocare (Oct 2026)
   -------------------------------------------------------------------------- */
families[0].name = "Electrostatic Liquid Cleaner";
families[0].layout = {
  label: "Japanese Technology",
  intro: [
    "Electrostatic Liquid Cleaner removes sub-micron contaminants, varnish, sludge and even bacteria in service oils.",
    "It improves oil quality, enhances system efficiency and extends oil life.",
  ],
  views: [
    { img: "elc/elc-side.jpg", caption: "Side View" },
    { img: "elc/elc-front.jpg", caption: "Front View" },
  ],
  catalogue: "https://www.ferrocare.com/_files/ugd/46b5d6_c12bdc346a1345d3b53963f08af433cc.pdf",
  keyStats: [
    { icon: "drop", title: "Removes", text: "contaminants up to 0.01 micron" },
    { icon: "ban", title: "No filter", text: "replacement" },
    { icon: "clock", title: "Extends oil life", text: "by 5 – 10 times" },
    { icon: "rupee", title: "Reduces", text: "maintenance cost" },
  ],
  criteria: [
    { icon: "volume", text: "Fluid Volume" },
    { icon: "viscosity", text: "Fluid Viscosity" },
    { icon: "gear", text: "Application" },
    { icon: "servo", text: "Servo Valves" },
    { icon: "proportional", text: "Proportional" },
  ],
  how: "Electrostatic charging causes sub-micron particles, water, varnish and bacteria to coalesce and get captured on the collector cell plates. The clean oil then returns to the system, resulting in improved performance and extended component life.",
  steps: [
    { icon: "dirty", title: "Contaminated Oil", sub: "0.01 micron & above" },
    { icon: "charge", title: "Electrostatic Charging", sub: "& Coalescing" },
    { icon: "clean", title: "Clean Oil", sub: "Return to System" },
  ],
  benefits: [
    { icon: "check", text: "Improves oil quality and cleanliness" },
    { icon: "trend", text: "Enhances system efficiency" },
    { icon: "funnel", text: "Extends oil and component life" },
    { icon: "gauge", text: "Reduces maintenance and downtime" },
    { icon: "rupee", text: "Lower operational cost" },
  ],
};

/* LVDH page — content supplied by Ferrocare (Oct 2026) */
families[1].name = "Low Vacuum Dehydration & Degassification";
families[1].layout = {
  label: "Low Vacuum Dehydration Unit",
  intro: [
    "Even 500 ppm of moisture in oil leads to catastrophic failures in hydraulic systems.",
    "The LVDH unit removes water / moisture to below 50% of the saturation point in oil at low temperature (44–60 °C).",
  ],
  views: [
    { img: "lvdh/lvdh-side.jpg", caption: "Side View" },
    { img: "lvdh/lvdh-front.jpg", caption: "Front View" },
  ],
  badges: [
    { k: "Moisture", v: "< 50% sat." },
    { k: "Operates at", v: "44–60 °C" },
  ],
  catalogue: "https://www.ferrocare.com/_files/ugd/46b5d6_9f819543c4bb4c5a9045cd97c7293ef5.pdf",
  keyStats: [
    { icon: "nofire", text: "Removes moisture without heating" },
    { icon: "therm", text: "Operates at low temperature" },
    { icon: "drop", text: "Removes moisture below 50% saturation point" },
    { icon: "check", text: "Restores oil to its original properties" },
    { icon: "shield", text: "Improves system reliability & life" },
  ],
  about: {
    title: "About the LVDH system",
    paras: [
      "The Low Vacuum Dehydration & Degassification (LVDH) system is the most effective way to remove moisture, dissolved gases and volatile contaminants from oils without using heat.",
      "The LVDH is the only system which can remove cracked oil, thus restoring oil to its original properties.",
    ],
  },
  applications: ["Hydraulic Oils", "Turbine Oils", "Compressor Oils", "Gear Oils", "Dehydration before blending different oils", "Vacuum Pump & Compressor Seal Oils"],
};
families[0].layout.badges = [{ k: "Removes", v: "0.01 µ" }, { k: "Oil life", v: "5–10×" }];

/* Gear Box page — content supplied by Ferrocare (Oct 2026) */
families[2].name = "Gear Box Oil Filtration";
families[2].layout = {
  label: "MS6 DHU – Magnetic Strainer with Mechanical Filter",
  intro: [
    "MS6 DHU units are designed to remove ferrous contamination from gear boxes efficiently, reducing downtime, extending oil drain intervals and improving overall system reliability.",
  ],
  views: [{ img: "gearbox/gearbox-ms6.jpg", caption: "MS6 DHU" }],
  wide: true,
  catalogue: "https://www.ferrocare.com/_files/ugd/46b5d6_c1d618bd372744788c7823eff38ad7bd.pdf",
  catalogueLabel: "Download Brochure",
  keyStats: [
    { icon: "magnet", title: "Removes ferrous particles", text: "Effectively captures metallic wear particles." },
    { icon: "clock", title: "Reduces gearbox downtime", text: "Keeps your system clean and running longer." },
    { icon: "drop", title: "Extends oil drain intervals", text: "Improves oil cleanliness and life." },
    { icon: "shield", title: "Improves reliability", text: "Enhances performance and protects equipment." },
  ],
  applications: ["Industrial Gearboxes", "Steel Plants", "Rolling Mills", "Mining Equipment", "Cement Plants", "Heavy Duty Gear Drives"],
  flowRange: { label: "Available models:", value: "20 to 400 LPM", note: "For detailed model selection and specifications, download the brochure." },
};

/* Magnetic Separator page — content supplied by Ferrocare (Oct 2026) */
families[3].name = "Magnetix Separator";
families[3].layout = {
  label: "Revolutionizing fluid separation with rare-earth magnetic technology",
  intro: [
    "Harnessing the power of rare-earth magnets, our Magnetic Separator offers up to 8 times the magnetic force of conventional ferrite magnets, setting a new standard in fluid separation technology.",
  ],
  views: [{ img: "magnetic/magnetix.jpg", caption: "Magnetix Separator" }],
  wide: true,
  catalogue: "https://www.ferrocare.com/_files/ugd/46b5d6_c1d618bd372744788c7823eff38ad7bd.pdf",
  catalogueLabel: "Click to know more",
  features: [
    { icon: "ban", text: "With dry cake discharge, our Magnetic Separator eliminates the need for consumables, ensuring cost-effectiveness and minimal maintenance." },
    { icon: "magnet", text: "Even materials with weak magnetic properties, such as carbide and scale, are efficiently separated thanks to our superior magnetic force." },
    { icon: "trend", text: "Experience improved surface finish, increased grinding wheel lifespan, reduced dressing frequency, and extended fluid life." },
    { icon: "rupee", text: "Our solution is not only environmentally friendly but also budget-friendly, providing cost savings over time." },
  ],
};

/* Oil Test Equipment page — content supplied by Ferrocare (Oct 2026), shown as tabs */
families[4].name = "Oil Test Equipment";
families[4].layout = {
  tabs: [
    {
      key: "particle-counter",
      name: "Particle Counter",
      intro: [
        "Introducing the Particle Counter, a precision instrument designed to detect and analyse particles in oils, liquids and systems.",
        "It helps maintain cleanliness, improves system performance and extends equipment life.",
      ],
      img: "oiltest/pc-opcom-hd.webp",
      images: [
        { img: "oiltest/pc-opcom-hd.webp", caption: "With OPCOM II" },
        { img: "oiltest/pc-printer-hd.webp", caption: "With printer" },
      ],
      keyStats: [
        { icon: "target", text: "High Accuracy" },
        { icon: "dots", text: "Particle Detection" },
        { icon: "bubbles", text: "Air Bubble Elimination" },
        { icon: "touch", text: "Easy Operation" },
      ],
      keyFeatures: [
        "Oil cleanliness codes: ISO 4406, NAS 1638, & SAE AS4059",
        "Particles are grouped by micron size in seven categories — 4, 6, 14, 21, 38, 70, >100µ",
        "The S120 counts air and gas bubbles and eliminates them from the counts",
        "Highly accurate sensor capable of self-calibration",
        "Full integration with SCADA/PC/PLC which can be controlled via analogue or digital instrumentation",
        "Wear particle identification as fatigue wear, sliding wear and cutting wear as well as fibres",
      ],
      criteriaNote: "Particle size, oil type, required cleanliness level and application conditions.",
    },
    {
      key: "moisture-sensor",
      name: "Moisture in Oil Sensor",
      intro: [
        "Water is the biggest enemy of hydraulic & lubricating oils — even bigger than particulate contamination.",
        "There is a clear nexus between presence of moisture and acid / sludge formation in oil. With the moisture sensor, users get a quick, accurate & simple way to detect moisture in oil in PPM (parts per million).",
        "Keeping moisture level in oil below the saturation point helps increase oil life and protects the system.",
      ],
      img: "oiltest/moisture-sensor.jpg",
    },
  ],
};

/* EPT page — summarised from the EPT Clean Oil brochure supplied by Ferrocare (Oct 2026) */
families[5].name = "EPT Machines";
families[5].layout = {
  label: "Lubricant Chemistry Management",
  intro: [
    "From the first day a lubricant is put into service, it begins to chemically break down — forming acids and varnish that filters cannot remove.",
    "EPT systems use patented ion-exchange technology to remove these breakdown products continuously, managing the chemistry of turbine, compressor, hydraulic and EHC fluids — not just the particles.",
  ],
  views: [{ img: "ept/ept-machine.jpg", caption: "EPT Machine" }],
  catalogue: "assets/docs/ept-clean-oil-brochure.pdf",
  catalogueLabel: "Download Brochure",
  keyStats: [
    { icon: "flask", title: "Removes acids & varnish", text: "Eliminates breakdown products and varnish precursors." },
    { icon: "shield", title: "Protects servo valves", text: "Prevents lubricant-related failures in critical systems." },
    { icon: "drop", title: "Controls oxygen & water", text: "TMR N₂ removes 98% of oxygen and keeps water very low." },
    { icon: "trend", title: "Extends fluid life", text: "Reduces failure costs and fluid replacement." },
  ],
  solutions: [
    { name: "Rust & Oxidation Turbine Oil", text: "Used in turbines, compressors and bearing applications. Breaks down through oxidation and forms varnish.", systems: ["ICB® RO", "SVR® RO", "TMR® N₂"] },
    { name: "Phosphate Ester Fluid (EHC)", text: "Fire-resistant fluids in turbine electro-hydraulic control systems. Hydrolyse and oxidise, creating acids and phenols.", systems: ["ICB® FRF", "SVR® FRF", "ECR® 10000", "TMR® N₂"] },
    { name: "Aeroderivative Turbine Oil", text: "Polyol ester jet lubes that degrade from heat, water and entrained oxygen, leading to varnish and coking.", systems: ["ICB® JET", "SVR® JET", "TMR® N₂"] },
    { name: "Anti-wear Hydraulic Oil", text: "Used from assembly processes to steel and paper mills. Oxidation and additive depletion generate acids and varnish.", systems: ["ICB® AW", "SVR® AW", "TMR® N₂"] },
  ],
  systems: [
    { name: "ICB®", text: "Patented ion-exchange element that continuously removes acids, varnish precursors and dissolved breakdown products." },
    { name: "SVR®", text: "Skid-mounted dialysis conditioning system that works 100% of the time, using ICB technology to remove acids and oxidation material as they form." },
    { name: "TMR® N₂", text: "High-purity nitrogen generation system that removes 98% of the oxygen present and keeps water at very low levels in breathing reservoirs." },
    { name: "ECR® 10000", text: "Integrated skid for EHC fluids — ICB FRF ion-exchange filters, ECR collectors, fine particulate filtration and TMR N₂ water removal in one system." },
  ],
};
