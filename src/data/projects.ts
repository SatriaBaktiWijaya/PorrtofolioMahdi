/**
 * Authentic Portfolio Data Model for Mahdi Wirawan
 * Extracted and Synthesized from Original Resource PDFs
 * Strictly Conforming to UI Design Specification § 4.7
 *
 * Owned by Subteam A: PDF Asset and Data Specialist
 */

export interface CMFColor {
  name: string;
  hex: string;
  pantone?: string;
  ral?: string;
  finishType: 'Matte' | 'Satin' | 'High-Gloss' | 'Metallic' | 'Textured' | 'Anodized';
  glossLevelGU?: number; // Gloss Units (e.g., 20 GU for matte, 95 GU for high-gloss)
}

export interface CMFMaterial {
  name: string;
  type: string; // e.g., "Polypropylene (PP)", "Ivory Paper", "Resin / PLA", "Aluminum Alloy"
  recyclable: boolean;
  notes?: string;
}

export interface CMFFinish {
  name: string;
  technique: string; // e.g., "Sandblasted", "Electrostatic Powder Coat", "Clear Lacquer 3-coat"
  tactility: string; // e.g., "Warm soft-touch", "Cold metallic bead-blast", "Earthen micro-grit"
}

export interface CMFSpecification {
  colors: CMFColor[];
  materials: CMFMaterial[];
  finishes: CMFFinish[];
}

export interface TechnicalDimension {
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  weightGrams?: number;
  capacityMl?: number;
}

export interface ExplodedPart {
  id: string;
  partNumber: string; // e.g., "P-01", "P-02"
  name: string;
  function: string;
  material: string;
  manufacturingProcess: string;
  calloutPosition: {
    xPercent: number; // 0 - 100% position on the exploded diagram
    yPercent: number;
  };
  ergonomicNote?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio: '16/9' | '4/3' | '1/1' | '3/2';
  isBlueprint?: boolean;
}

export interface ProjectStory {
  challenge: string;
  contextNarrative: string;
  ergonomicsResearch?: {
    summary: string;
    targetUserPersona?: string;
    academicCitations?: string[];
    keyPainPoints: string[];
    ergonomicSolutions: string[];
  };
  ideation: {
    narrative: string;
    sketches: GalleryImage[];
    designOptions?: {
      conceptName: string;
      description: string;
      image: string;
    }[];
  };
  cadAndEngineering: {
    softwareUsed: string[];
    tolerancesMm?: string;
    blueprintDrawings?: GalleryImage[];
    explodedParts?: ExplodedPart[];
  };
  prototypingAndManufacturing: {
    methods: string[];
    scale: string; // e.g., "1:1", "1:2", "1:10"
    materialsUsed: string[];
    steps: {
      stepNumber: number;
      title: string;
      description: string;
      image?: string;
    }[];
  };
  gallery: GalleryImage[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  japaneseTitle?: string; // e.g., "剣聖" for Mazda Kensei
  year: number;
  semester: string; // e.g., "Semester 5", "Studio DP1", "Studio DP2"
  category: 'Automotive Design' | 'Industrial & Product' | 'Transportation' | '3D Styling & CAD';
  role: string; // e.g., "Lead Industrial Designer & 3D Modeler"
  featured: boolean;
  order: number;
  heroImage: string;
  thumbnailImage: string;
  blueprintImage?: string;
  software: string[];
  dimensions?: TechnicalDimension;
  cmf: CMFSpecification;
  story: ProjectStory;
}

export interface LeadershipRole {
  title: string;
  organization: string;
  period: string;
}

export interface ExperienceRole {
  role: string;
  organization: string;
  period: string;
}

export interface DesignerProfile {
  name: string;
  nim: string;
  role: string;
  university: string;
  department: string;
  semester: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  portraitImage: string;
  leadership: LeadershipRole[];
  experience: ExperienceRole[];
  skills: {
    modeling: string[];
    rendering: string[];
    designThinking: string[];
    prototyping: string[];
  };
  favoriteBrands: string[];
}

export const DESIGNER_PROFILE: DesignerProfile = {
  name: "Mahdi Wirawan",
  nim: "106092430002",
  role: "Industrial & Automotive Product Designer",
  university: "Telkom University Purwokerto",
  department: "S1 Desain Produk",
  semester: "Semester 5 (Active)",
  bio: "Mahasiswa Desain Produk di Telkom University Purwokerto dengan fokus mendalam pada desain produk fisik, styling otomotif, pemodelan permukaan 3D digital (NURBS G2), dan visualisasi fotorealistis. Berdedikasi menghadirkan harmoni antara rekayasa ergonomi presisi dan estetika emosional berstandar tinggi.",
  location: "Purwokerto, Jawa Tengah, Indonesia",
  email: "mahdiiwirawaan74@gmail.com",
  phone: "+62 813 9011 2566",
  instagram: "@mahdywrn",
  portraitImage: "/profile/mahdi-portrait.jpg",
  leadership: [
    {
      title: "Ketua HIDEO",
      organization: "Himpunan Mahasiswa Desain Produk Telkom University Purwokerto",
      period: "2026"
    },
    {
      title: "Wakil Ketua HIDEO",
      organization: "Himpunan Mahasiswa Desain Produk Telkom University Purwokerto",
      period: "2025"
    }
  ],
  experience: [
    {
      role: "Asisten Praktikum Gambar Teknik",
      organization: "Laboratorium Desain Produk Telkom University Purwokerto",
      period: "2025"
    }
  ],
  skills: {
    modeling: ["Rhinoceros 8", "NURBS Surfacing (G2 Continuity)", "CAD Technical Drafting (A3 Blueprints)", "Inkscape"],
    rendering: ["KeyShot 11", "Blender", "Adobe Photoshop Digital Painting"],
    designThinking: ["Ergonomic Posture Analysis", "Affinity Diagramming", "User Persona Research", "Bill of Materials (BOM)"],
    prototyping: ["FDM 3D Printing", "Paper Maquette Modeling", "Automotive Primer & Spray Finishing", "Wet-Sanding & Buffing"]
  },
  favoriteBrands: ["Mazda", "Lotus", "Braun (Dieter Rams)", "Apple"]
};

export const PROJECTS: Project[] = [
  {
    id: "mazda-kensei",
    slug: "mazda-kensei",
    title: "Mazda Project Kensei",
    subtitle: "Automotive Fragrance Vessel Concept",
    tagline: "Scent that moves you",
    japaneseTitle: "剣聖",
    year: 2025,
    semester: "Studio DP1",
    category: "Industrial & Product",
    role: "Lead Industrial Designer & 3D Modeler",
    featured: true,
    order: 1,
    heroImage: "/projects/mazda-kensei/kensei-front-view.png",
    thumbnailImage: "/projects/mazda-kensei/kensei-detail-view.png",
    software: ["Rhinoceros 8", "KeyShot", "Adobe Photoshop", "UltiMaker Cura (FDM 3D Printing)"],
    dimensions: {
      lengthMm: 65.0,
      widthMm: 65.0,
      heightMm: 140.0,
      weightGrams: 280,
      capacityMl: 80
    },
    cmf: {
      colors: [
        {
          name: "Soul Red Crystal Metallic",
          hex: "#8c0b14",
          pantone: "PMS 187 C",
          finishType: "Metallic",
          glossLevelGU: 95
        },
        {
          name: "Machined Hyper Silver",
          hex: "#d1d5db",
          pantone: "PMS 877 C",
          finishType: "Satin",
          glossLevelGU: 45
        },
        {
          name: "Piano Gloss Black",
          hex: "#111113",
          pantone: "Process Black C",
          finishType: "High-Gloss",
          glossLevelGU: 92
        }
      ],
      materials: [
        {
          name: "Optical Resin Polymer",
          type: "Vessel Outer Body",
          recyclable: false,
          notes: "High-density UV-cured polymer shell providing seamless G2 continuous curvature"
        },
        {
          name: "6061-T6 Aluminum Alloy",
          type: "Cap & Atomizer Shroud",
          recyclable: true,
          notes: "Precision CNC turned collar with tactile micro-knurling"
        },
        {
          name: "Borosilicate Glass Flacon",
          type: "Internal Reservoir",
          recyclable: true,
          notes: "Chemically inert inner capsule safely preserving aromatic fragrance oils"
        }
      ],
      finishes: [
        {
          name: "Mirror Gloss Clearcoat",
          technique: "Multi-stage candy automotive clearcoat buffed to 2000-grit wet polish",
          tactility: "Flawless glass-like slick reflection"
        },
        {
          name: "Directional Micro-Brush",
          technique: "Circumferential bead-blast and micro-brush on aluminum collar",
          tactility: "Cool metallic velvety grip"
        }
      ]
    },
    story: {
      challenge: "Tantangan desain berpusat pada menangkap esensi gerakan dinamis mobil Mazda ke dalam objek statis berskala kecil tanpa terjebak pada bentuk mobil miniatur literal. Bentuk harus menyampaikan ketegangan garis bodi, proporsi seimbang, dan permainan cahaya khas cat Soul Red Crystal yang dinamis.",
      contextNarrative: "Mazda Project Kensei (剣聖) adalah konsep botol parfum mewah yang menerjemahkan bahasa desain ikonik Mazda, KODO: Soul of Motion ('Jiwa Gerak'), ke dalam wujud objek genggam. Botol parfum ini merupakan eksplorasi konseptual tentang bagaimana wujud parfum premium jika dirancang dengan filosofi emosional Jepang Jinba Ittai (kesatuan harmonis antara pengemudi dan kendaraan).",
      ideation: {
        narrative: "Proses ideasi mengembangkan dua alternatif konsep utama: Konsep A (aliran aerodinamis organik yang terinspirasi sayap Mazda) dan Konsep B (siluet tegas dengan penekanan pada sudut tajam pedang katana / Kensei). Sketsa disempurnakan dengan proporsi ramping dan garis-garis mengalir halus yang menciptakan ilusi gerak permanen.",
        sketches: [
          {
            src: "/projects/mazda-kensei/kensei-sketch-final-board.png",
            alt: "Final Ideation Sketches Board",
            caption: "Lembar sketsa ideasi manual dan digital mengeksplorasi garis aliran sayap dan pedang Kensei (2270x1931).",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/mazda-kensei/kensei-sketch-concept-a.png",
            alt: "Concept A Dynamic Flow Sketch",
            caption: "Konsep A - Aliran aerodinamis sayap Mazda dengan lekukan bodi fluida.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/mazda-kensei/kensei-sketch-concept-b.png",
            alt: "Concept B Blade Profile Sketch",
            caption: "Konsep B - Siluet tegas dengan sudut tajam pedang katana Jepang.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/mazda-kensei/kensei-sketch-elevation.png",
            alt: "Elevation Profile Line Sketch",
            caption: "Studi elevasi proporsi vertikal garis bahu dan penutup.",
            aspectRatio: "4/3"
          }
        ],
        designOptions: [
          {
            conceptName: "Konsep A: Aerodynamic Wing Flow",
            description: "Siluet bodi lembut mengalir yang mengutamakan kontur sayap khas grille Mazda.",
            image: "/projects/mazda-kensei/kensei-sketch-concept-a.png"
          },
          {
            conceptName: "Konsep B: Katana Blade Facet",
            description: "Sudut facet tajam berkarakter tegas terinspirasi seni pedang Jepang (Kensei).",
            image: "/projects/mazda-kensei/kensei-sketch-concept-b.png"
          }
        ]
      },
      cadAndEngineering: {
        softwareUsed: ["Rhinoceros 8", "KeyShot 11"],
        tolerancesMm: "±0.15 mm",
        blueprintDrawings: [
          {
            src: "/projects/mazda-kensei/kensei-top-view.png",
            alt: "CAD Top Orthogonal",
            caption: "Tampak atas memperlihatkan proporsi bodi aerodinamis berkesinambungan kurvatur G2.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/mazda-kensei/kensei-cad-side-profile.jpg",
            alt: "CAD Curvature Continuous Edge",
            caption: "Kontrol kurvatur continuous edge pada garis pinggang botol di Rhinoceros 8.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/mazda-kensei/kensei-cad-rhino-hero.jpg",
            alt: "Rhinoceros 8 3D Surface Model",
            caption: "Permukaan NURBS 3D di Rhinoceros 8 dengan kontrol kelengkungan refleksi tanpa patahan.",
            aspectRatio: "1/1"
          }
        ],
        explodedParts: [
          {
            id: "p-01",
            partNumber: "P-01",
            name: "Outer Cap & Shroud",
            function: "Pelindung nozzle atomizer dengan aksen machined brushed aluminum.",
            material: "Alloy 6061-T6",
            manufacturingProcess: "CNC Turning & Directional Brushing",
            calloutPosition: { xPercent: 50, yPercent: 20 },
            ergonomicNote: "Micro-knurling tactile feel untuk kemudahan membuka tutup dengan satu tangan."
          },
          {
            id: "p-02",
            partNumber: "P-02",
            name: "Fine-Mist Atomizer Pump",
            function: "Mekanisme semprot kabut mikro dengan aktuasi presisi 0.12 ml per semprotan.",
            material: "Stainless Steel & POM Bushing",
            manufacturingProcess: "Precision Mechanical Assembly",
            calloutPosition: { xPercent: 50, yPercent: 38 }
          },
          {
            id: "p-03",
            partNumber: "P-03",
            name: "Sculptural Outer Shell",
            function: "Cangkang utama bodi aerodinamis dengan lekukan KODO dan pantulan cat Soul Red.",
            material: "Optical Polymer Resin",
            manufacturingProcess: "High-Precision SLA 3D Printing & Tooling",
            calloutPosition: { xPercent: 50, yPercent: 62 }
          },
          {
            id: "p-04",
            partNumber: "P-04",
            name: "Inner Glass Flacon",
            function: "Reservoir internal 80 ml tahan reaksi kimia untuk menyimpan konsentrat wewangian.",
            material: "Borosilicate Glass",
            manufacturingProcess: "Precision Blow Molding",
            calloutPosition: { xPercent: 50, yPercent: 82 }
          }
        ]
      },
      prototypingAndManufacturing: {
        methods: [
          "1:1 Scale Paper Maquette",
          "Rapid FDM 3D Printing",
          "Automotive Putty & Dempul Filler",
          "Silver Metallic Undercoat",
          "Candy Maroon Translucent Coat",
          "2K High-Gloss Clearcoat Buffing"
        ],
        scale: "1:1",
        materialsUsed: [
          "PLA Polymer",
          "Automotive Polyester Putty",
          "Acrylic Primer Filler",
          "Metallic Silver Basecoat",
          "Soul Red Tinted Lacquer",
          "2K Polyurethane Clearcoat"
        ],
        steps: [
          {
            stepNumber: 1,
            title: "Model Studi Kertas 1:1",
            description: "Validasi awal ergonomi genggaman dan proporsi fisik menggunakan mock-up kertas terlipat."
          },
          {
            stepNumber: 2,
            title: "Rapid 3D Printing",
            description: "Pencetakan bodi prototipe 3D printing resolusi tinggi untuk menangkap kontur kurvatur NURBS.",
            image: "/projects/mazda-kensei/kensei-proto-3dprint.jpg"
          },
          {
            stepNumber: 3,
            title: "Perataan Permukaan & Dempul",
            description: "Aplikasi dempul filler otomotif dan pengamplasan basah bertahap hingga grid 1000 untuk menghilangkan garis layer.",
            image: "/projects/mazda-kensei/kensei-proto-putty-sanding.jpg"
          },
          {
            stepNumber: 4,
            title: "Warna Dasar Silver Metalik",
            description: "Penyemprotan undercoat silver metalik reflektif sebagai lapisan dasar pantulan spekular.",
            image: "/projects/mazda-kensei/kensei-proto-silver-undercoat.jpg"
          },
          {
            stepNumber: 5,
            title: "Warna Utama Maroon Translusen",
            description: "Pelapisan cat warna merah maroon transparan candy coat untuk menciptakan efek gradasi kontras khas Soul Red.",
            image: "/projects/mazda-kensei/kensei-proto-maroon-coat.jpg"
          },
          {
            stepNumber: 6,
            title: "Finishing Gloss Clearcoat & Buffing",
            description: "Aplikasi 2K automotive clearcoat berlapis dengan wet sanding dan buffing hingga kilap cermin sempurna.",
            image: "/projects/mazda-kensei/kensei-final-model-hero.jpg"
          }
        ]
      },
      gallery: [
        {
          src: "/projects/mazda-kensei/kensei-front-view.png",
          alt: "Front Orthogonal Render",
          caption: "Tampak depan botol parfum Mazda Kensei dengan refleksi warna Soul Red Crystal yang dramatis.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-detail-view.png",
          alt: "Sculptural Detail View",
          caption: "Detail transisi permukaan bahu botol dan tutup beraksen brushed metal.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-top-view.png",
          alt: "Aerodynamic Top View",
          caption: "Tampak atas memperlihatkan proporsi bodi ramping bergradasi aerodinamis.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-exploded-view.png",
          alt: "Exploded Component View",
          caption: "Visualisasi exploded view memperlihatkan tutup luar, atomizer nozzle, dan flacon reservoir.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-final-model-hero.jpg",
          alt: "Physical Prototype 1:1 Scale",
          caption: "Prototipe fisik riil skala 1:1 hasil 3D printing dengan multi-layer candy automotive paint finish.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-final-model-perspective.jpg",
          alt: "Physical Prototype Angle View",
          caption: "Sudut perspektif prototipe fisik memperlihatkan pantulan garis bodi di bawah pencahayaan studio.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-final-model-cap-detail.jpg",
          alt: "Cap & Shoulder Precision Detail",
          caption: "Ketelitian sambungan tutup botol dan garis bahu prototipe fisik.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-render-front-angle.jpg",
          alt: "Front Angle Studio Render",
          caption: "Render studio memperlihatkan gradasi warna Soul Red dari terang spekular hingga bayangan gelap.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/mazda-kensei/kensei-render-studio.jpg",
          alt: "Studio Lighting Render",
          caption: "Render pencahayaan studio dramatis berlatar gelap Obsidian.",
          aspectRatio: "1/1"
        },
        {
          src: "/projects/mazda-kensei/kensei-slide-04-concept.png",
          alt: "Presentation Slide 04: Concept",
          caption: "Slide presentasi studio MK DP1: Ikhtisar konsep desain dan inspirasi.",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/mazda-kensei/kensei-slide-05-brand-matrix.png",
          alt: "Presentation Slide 05: Brand Matrix",
          caption: "Slide presentasi studio MK DP1: Matriks identitas merek Mazda (Personality, Culture, Physique, Relationship).",
          aspectRatio: "16/9"
        }
      ]
    }
  },
  {
    id: "twist-n-pour",
    slug: "twist-n-pour",
    title: "Twist n Pour",
    subtitle: "Earthen-Minimalism Gardening Vessel",
    tagline: "Precision hydration disguised as living interior sculpture",
    year: 2026,
    semester: "Studio DP2",
    category: "Industrial & Product",
    role: "Lead Industrial Designer & Ergonomic Researcher",
    featured: true,
    order: 2,
    heroImage: "/projects/twist-n-pour/twist-hero-main.png",
    thumbnailImage: "/projects/twist-n-pour/twist-exploded-perspective.png",
    blueprintImage: "/projects/twist-n-pour/blueprints/blueprint-sheet-1-gambar-tampak.png",
    software: ["Rhinoceros 8", "Affinity Designer", "CAD Technical Drafting (A3 Blueprints)", "Ergonomic Analysis"],
    dimensions: {
      lengthMm: 180.0,
      widthMm: 65.0,
      heightMm: 178.4,
      weightGrams: 235,
      capacityMl: 750
    },
    cmf: {
      colors: [
        {
          name: "Terracotta Clay",
          hex: "#c37353",
          pantone: "PMS 7592 C",
          finishType: "Textured",
          glossLevelGU: 12
        },
        {
          name: "Oat Sand Matte",
          hex: "#ded3be",
          pantone: "PMS 7527 C",
          finishType: "Matte",
          glossLevelGU: 10
        },
        {
          name: "Deep Moss Basalt",
          hex: "#3d483e",
          pantone: "PMS 5535 C",
          finishType: "Matte",
          glossLevelGU: 15
        }
      ],
      materials: [
        {
          name: "Textured Bio-Composite PP",
          type: "Can Body & Reservoir",
          recyclable: true,
          notes: "Food-grade polypropylene infused with natural mineral filler giving ceramic tactile warmth"
        },
        {
          name: "Precision POM / Acetal",
          type: "Rotary Nozzle Bushing",
          recyclable: true,
          notes: "Self-lubricating engineering plastic ensuring smooth 180° rotation and zero leaks"
        },
        {
          name: "Silicone Elastomer",
          type: "Gasket & Nozzle Cap Grip Ring",
          recyclable: false,
          notes: "Hydrophobic seal ring preventing dripping when nozzle is stored"
        }
      ],
      finishes: [
        {
          name: "Fine Mold-Tech Clay Texture",
          technique: "Chemical mold EDM texture MT-11010",
          tactility: "Earthen micro-grit soft-warm pottery feel"
        },
        {
          name: "Satin Smooth Bore",
          technique: "Mirror polished mold runner core",
          tactility: "Laminar flow ultra-smooth hydraulic channel"
        }
      ]
    },
    story: {
      challenge: "Tren urban gardening dan tanaman hias indoor berkembang pesat, namun alat penyiram konvensional di pasaran didominasi teko plastik tipis berpenampilan murah yang rawan bocor, gagang yang menyebabkan pegal pergelangan tangan, serta nozzle yang sering mencipratkan air kotor ke perabot rumah.",
      contextNarrative: "Twist n Pour mengusung estetika Earthen-Minimalism melalui wujud geometri cincin asimetris yang menyerupai tembikar tanah liat alami yang membumi. Memadukan keindahan dan fungsionalitas, perangkat ini secara cerdas menyembunyikan fungsi utilitasnya di dalam struktur lingkaran bodi yang bersih, di mana komponen nozzle baru akan muncul secara seamless melalui gerakan rotasi 180° saat akan digunakan.",
      ergonomicsResearch: {
        summary: "Riset ergonomi mendalam mengacu pada studi empiris biomekanika lengan atas saat menuang air. Desain gagang dioptimalkan untuk meminimalkan deviasi pergelangan tangan dan mencegah kelelahan otot lokal.",
        targetUserPersona: "Adrian Pratama (28 tahun, Senior Graphic Designer di Jakarta, tinggal di apartemen modern dengan koleksi tanaman indoor minimalis).",
        academicCitations: [
          "Uy, J. P., Chang, C. C., Fallentin, N., McGorry, R. W., & Hsiang, S. M. (2013). 'The effect of handle design on upper extremity posture and muscle activity during a pouring task.' Ergonomics, 56(8), 1326-1335."
        ],
        keyPainPoints: [
          "Deviasi pergelangan tangan (wrist flexion/extension) berlebih saat menuang dengan teko konvensional memicu ketegangan otot lengan bawah.",
          "Diameter pegangan yang terlalu tebal (>35 mm) mempercepat kelelahan otot fleksor jari tangan.",
          "Jika berat total alat + air mencapai 10%-15% dari kekuatan genggaman maksimal pengguna, kelelahan otot lokal mulai terasa hanya dalam waktu 2 hingga 3 menit."
        ],
        ergonomicSolutions: [
          "Gagang Posisi Tinggi dengan Kemiringan Miring (High & Sloped): Menjaga pergelangan tangan pengguna tetap lurus pada postur netral sepanjang siklus menuang.",
          "Diameter gagang dioptimalkan pada 24.8 mm (~25 mm), spesifikasi yang terbukti secara saintifik menghasilkan beban otot tangan terendah selama fase menuang.",
          "Volume dibatasi secara presisi pada 0.75 Liter (berat total ~0.98 kg dengan air), ideal untuk siklus penyiraman 10-15 tanaman tanpa memicu kelelahan otot lokal."
        ]
      },
      ideation: {
        narrative: "Melalui proses wawancara 5 pengguna dan sintesis Affinity Diagram, disusun Persona Pengguna Adrian Pratama. Eksplorasi sketsa menghasilkan Konsep A (siluet fauna) dan Konsep B (rotatable nozzle torus). Konsep B terpilih melalui matriks penilaian tertimbang (bobot ergonomi 0.9, siluet bentuk 0.8, panjang nozzle 0.8, kesesuaian tema 0.6) dengan skor tertinggi 26.2.",
        sketches: [
          {
            src: "/projects/twist-n-pour/twist-sketch-concepts.jpg",
            alt: "Alternative Concepts A & B",
            caption: "Eksplorasi sketsa alternatif konsep bentuk A dan B (1461x446).",
            aspectRatio: "16/9"
          },
          {
            src: "/projects/twist-n-pour/twist-sketch-development.jpg",
            alt: "Development Sketches A-E",
            caption: "Pengembangan garis bodi dan mekanisme lipat nozzle rotasi.",
            aspectRatio: "16/9"
          },
          {
            src: "/projects/twist-n-pour/twist-sketch-evaluation-table.jpg",
            alt: "Concept Scoring Matrix",
            caption: "Matriks evaluasi konsep berbobot ergonomi ilmiah (Konsep B menang skor 26.2).",
            aspectRatio: "16/9"
          },
          {
            src: "/projects/twist-n-pour/twist-board-affinity-diagram.jpg",
            alt: "Affinity Diagram Comprehensive Board",
            caption: "Sintesis riset pengguna dan diagram afinitas komprehensif (3508x2481).",
            aspectRatio: "4/3"
          }
        ],
        designOptions: [
          {
            conceptName: "Konsep A: Asymmetric Flora Spout",
            description: "Siluet kurva organik terinspirasi bentuk kelopak daun dan fauna.",
            image: "/projects/twist-n-pour/twist-sketch-concepts.jpg"
          },
          {
            conceptName: "Konsep B: Torus Asymmetric Rotatable Nozzle",
            description: "Cincin asimetris dengan nozzle rotasi tersembunyi (Pemenang Evaluasi: Skor 26.2).",
            image: "/projects/twist-n-pour/twist-hero-main.png"
          }
        ]
      },
      cadAndEngineering: {
        softwareUsed: ["Rhinoceros 8", "CAD Technical Drafting (A3 Blueprints)"],
        tolerancesMm: "±0.20 mm (Injection Molding Profile)",
        blueprintDrawings: [
          {
            src: "/projects/twist-n-pour/blueprints/blueprint-sheet-1-gambar-tampak.png",
            alt: "Sheet 1: GAMBAR TAMPAK",
            caption: "Lembar 1: GAMBAR TAMPAK (Tampak Belakang, Samping, Atas, Perspektif - Skala 1:2, Format A3 300 DPI).",
            aspectRatio: "16/9",
            isBlueprint: true
          },
          {
            src: "/projects/twist-n-pour/blueprints/blueprint-sheet-2-gambar-potongan.png",
            alt: "Sheet 2: GAMBAR POTONGAN",
            caption: "Lembar 2: GAMBAR POTONGAN (Cross Sections A-A & B-B Tebal Dinding 2.0 mm - Skala 1:1, Format A3 300 DPI).",
            aspectRatio: "16/9",
            isBlueprint: true
          },
          {
            src: "/projects/twist-n-pour/blueprints/blueprint-sheet-3-gambar-detail.png",
            alt: "Sheet 3: GAMBAR DETAIL",
            caption: "Lembar 3: GAMBAR DETAIL (Nozzle Cap, Can Lid, Engsel Rotasi - Skala 1:2 & 1:1, Format A3 300 DPI).",
            aspectRatio: "16/9",
            isBlueprint: true
          },
          {
            src: "/projects/twist-n-pour/blueprints/blueprint-sheet-4-exploded-view.png",
            alt: "Sheet 4: GAMBAR EXPLODED VIEW",
            caption: "Lembar 4: GAMBAR EXPLODED VIEW (Parts 1-4 dengan Bill of Materials - Skala 1:1, Format A3 300 DPI).",
            aspectRatio: "16/9",
            isBlueprint: true
          }
        ],
        explodedParts: [
          {
            id: "p-01",
            partNumber: "P-01",
            name: "Can Body",
            function: "Struktur cincin asimetris penampung air utama 0.75 L dengan pegangan ergonomis multi-posisi.",
            material: "Bio-Composite Matte PP",
            manufacturingProcess: "Injection Molding with Side-Action Sliders",
            calloutPosition: { xPercent: 48, yPercent: 65 },
            ergonomicNote: "Diameter pegangan 24.8 mm (~25 mm) terbukti meminimalkan kelelahan otot tangan per Uy et al. (2013)."
          },
          {
            id: "p-02",
            partNumber: "P-02",
            name: "Rotary Nozzle Spout",
            function: "Pipa penyalur air yang berotasi 180° keluar dari bodi dan dapat dilipat rata saat disimpan.",
            material: "Food-Grade PP / POM Bushing",
            manufacturingProcess: "Injection Molding with Integrated Pivot Ring",
            calloutPosition: { xPercent: 28, yPercent: 42 },
            ergonomicNote: "Jangkauan spout 103.8 mm memungkinkan penyiraman presisi ke akar pot tanpa menunduk."
          },
          {
            id: "p-03",
            partNumber: "P-03",
            name: "Can Lid",
            function: "Penutup lubang pengisian air Ø48.1 mm dengan engsel terintegrasi anti-tumpah.",
            material: "Molded PP with Integrated Hinge Pin",
            manufacturingProcess: "Single-Cavity Tooling",
            calloutPosition: { xPercent: 68, yPercent: 30 },
            ergonomicNote: "Aperture Ø48.1 mm memudahkan pengisian langsung di bawah keran wastafel tanpa percikan."
          },
          {
            id: "p-04",
            partNumber: "P-04",
            name: "Nozzle Cap",
            function: "Pengatur debit air putar dengan dua opsi: Mode Normal (akar presisi) dan Mode Shower (sebaran halus).",
            material: "PP + Silicone Grip Ring",
            manufacturingProcess: "Two-Shot Overmolding",
            calloutPosition: { xPercent: 18, yPercent: 25 },
            ergonomicNote: "Cincin silikon bertekstur memberikan grip mantap saat tangan pengguna basah."
          }
        ]
      },
      prototypingAndManufacturing: {
        methods: [
          "Rhinoceros 8 Parametric Solid Modeling",
          "A3 Engineering Technical Blueprints (4 Sheets)",
          "Functional 3D SLA Prototype Testing",
          "Rotary Seal Leakage & Flow Testing"
        ],
        scale: "1:1",
        materialsUsed: [
          "Bio-Composite Polypropylene",
          "Acetal / POM Engineering Plastic",
          "Silicone Elastomer Seals"
        ],
        steps: [
          {
            stepNumber: 1,
            title: "CAD Modeling & Volume Verification",
            description: "Pemodelan bodi cincin asimetris di Rhinoceros 8 dengan kalkulasi kapasitas fluida presisi 0.75 Liter.",
            image: "/projects/twist-n-pour/twist-orthographic-cad-sheet.jpg"
          },
          {
            stepNumber: 2,
            title: "Penyusunan Gambar Kerja Teknik (A3)",
            description: "Pembuatan 4 lembar gambar kerja standar industri: Proyeksi ortogonal, potongan penampang, detail komponen, dan exploded view BOM.",
            image: "/projects/twist-n-pour/blueprints/blueprint-sheet-1-gambar-tampak.png"
          },
          {
            stepNumber: 3,
            title: "Verifikasi Mekanisme Rotasi Nozzle 180°",
            description: "Pengujian toleransi mekanis engsel pivot dan cincin o-ring untuk memastikan putaran halus bebas bocor.",
            image: "/projects/twist-n-pour/twist-mode-open.png"
          },
          {
            stepNumber: 4,
            title: "Pengujian Dua Mode Aliran Air",
            description: "Validasi fungsional mode aliran jet terarah untuk akar tanaman dan mode shower untuk dedaunan indoor.",
            image: "/projects/twist-n-pour/twist-operational-modes.jpg"
          }
        ]
      },
      gallery: [
        {
          src: "/projects/twist-n-pour/twist-hero-main.png",
          alt: "Hero Studio Render",
          caption: "Wujud cincin asimetris Twist n Pour dalam balutan warna Terracotta bertekstur earthen matte.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-exploded-perspective.png",
          alt: "Exploded Perspective Breakdown",
          caption: "Visualisasi exploded view memperlihatkan keempat komponen utama yang terintegrasi secara modular.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-mode-open.png",
          alt: "Operational Mode: Deployed 180°",
          caption: "Nozzle diputar 180 derajat siap mengalirkan air dengan jangkauan presisi ke pangkal akar pot.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-mode-closed.png",
          alt: "Operational Mode: Concealed Resting",
          caption: "Nozzle dilipat rapat ke lekuk bodi utama bertransformasi menjadi patung dekoratif interior.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-part-nozzle-detail.png",
          alt: "Dual Dispense Nozzle Cap Detail",
          caption: "Mekanisme putar nozzle cap untuk beralih antara semprotan terarah dan pancuran halus.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-operation-filling.png",
          alt: "Top Water Filling Port",
          caption: "Pengisian air mudah melalui lubang atas Ø48.1 mm berpenutup flip anti-tumpah.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-part-can-cap.png",
          alt: "Can Lid Flush Detail",
          caption: "Tutup bodi atas terintegrasi rata dengan garis kurva cincin.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-studio-angle.jpg",
          alt: "Studio Angle Isometric Render",
          caption: "Render studio isometrik memperlihatkan proporsi ketebalan bodi 65 mm.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-in-use-decor.png",
          alt: "Decorative Display in Modern Interior",
          caption: "Twist n Pour berfungsi ganda sebagai karya seni patung dekoratif di ruang tamu minimalis.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/twist-n-pour/twist-in-use-watering.jpg",
          alt: "Precision Watering Action",
          caption: "Aksi penyiraman presisi pada tanaman indoor dengan postur tangan netral.",
          aspectRatio: "1/1"
        },
        {
          src: "/projects/twist-n-pour/blueprints/blueprint-sheet-1-gambar-tampak.png",
          alt: "Engineering Blueprint Sheet 1",
          caption: "Gambar kerja teknik Lembar 1: Ortogonal & Dimensi Utama (Skala 1:2, A3).",
          aspectRatio: "16/9",
          isBlueprint: true
        },
        {
          src: "/projects/twist-n-pour/blueprints/blueprint-sheet-4-exploded-view.png",
          alt: "Engineering Blueprint Sheet 4",
          caption: "Gambar kerja teknik Lembar 4: Exploded View Perakitan Komponen & BOM (Skala 1:1, A3).",
          aspectRatio: "16/9",
          isBlueprint: true
        }
      ]
    }
  },
  {
    id: "esprit-otoped",
    slug: "esprit-otoped",
    title: "Esprit Otoped",
    subtitle: "Retro-Futuristic Urban Commuter Scooter",
    tagline: "Wedge dynamics from 1976 reborn for modern zero-emission city transit",
    year: 2025,
    semester: "Studio DP1",
    category: "Transportation",
    role: "Lead Concept Designer & 3D Stylist",
    featured: true,
    order: 3,
    heroImage: "/projects/esprit-otoped/otoped-hero-3d-render.jpg",
    thumbnailImage: "/projects/esprit-otoped/otoped-final-sketch.png",
    software: ["Rhinoceros 8", "KeyShot", "Adobe Photoshop", "Analog Marker Ideation"],
    dimensions: {
      lengthMm: 980.0,
      widthMm: 420.0,
      heightMm: 1080.0,
      weightGrams: 11500
    },
    cmf: {
      colors: [
        {
          name: "Lotus Glacier White",
          hex: "#f3f4f6",
          pantone: "PMS Bright White",
          finishType: "Satin",
          glossLevelGU: 35
        },
        {
          name: "Satin Monocoque Black",
          hex: "#18181b",
          pantone: "PMS Black 6 C",
          finishType: "Matte",
          glossLevelGU: 15
        },
        {
          name: "Electric Acid Green",
          hex: "#22c55e",
          pantone: "PMS 802 C",
          finishType: "High-Gloss",
          glossLevelGU: 85
        }
      ],
      materials: [
        {
          name: "Extruded 6061-T6 Aluminum",
          type: "Chassis & Folding Neck",
          recyclable: true,
          notes: "Lightweight aircraft-grade alloy frame engineered with sharp folded planar geometry"
        },
        {
          name: "Structural Carbon Fiber Composite",
          type: "Foldable Foot Deck",
          recyclable: false,
          notes: "High torsional stiffness footplate with embedded silicone grip grooves"
        },
        {
          name: "Molded Polycarbonate",
          type: "Front Facia & Fairing",
          recyclable: true,
          notes: "Impact-resistant front nose cone housing hidden horizontal LED light bar"
        }
      ],
      finishes: [
        {
          name: "Powder-Coat Satin",
          technique: "Electrostatic architectural powder coat",
          tactility: "Scratch-resistant velvet low-sheen touch"
        },
        {
          name: "Anodized Matte Jet",
          technique: "Type III hardcoat anodizing 50 microns",
          tactility: "Corrosion-resistant dense metallic finish"
        }
      ]
    },
    story: {
      challenge: "Mayoritas skuter listrik komuter perkotaan saat ini memiliki siluet bulat generik yang kurang memiliki karakter visual kuat. Tantangannya adalah mengadaptasi bahasa desain tajam bersudut (geometric wedge) dari supercar ikonik tanpa mengorbankan keamanan ergonomis pengendara dan efisiensi mobilitas perkotaan.",
      contextNarrative: "Esprit Otoped terinspirasi langsung oleh mobil sport legendaris Lotus Esprit S1 keluaran 1976 karya Giorgetto Giugiaro, terutama bentuk ikonik 'origami wedge' yang revolusioner. Desain ini memadukan aura retro mobil sport tahun 70-an dengan keanggunan minimalis kendaraan listrik modern.",
      ideation: {
        narrative: "Melalui dekonstruksi estetika Lotus Esprit S1, garis-garis kunci seperti hidung rendah berbentuk baji tajam, lipatan tajam sisi bodi, dan kombinasi kontras monokrom diisolasi dan diinterpretasikan ulang ke dalam arsitektur skuter komuter modern. Eksplorasi berawal dari sketsa konsep pensil dan spidol marker, meneliti sudut tiang kemudi dan fairing roda.",
        sketches: [
          {
            src: "/projects/esprit-otoped/otoped-final-sketch.png",
            alt: "Final Design Concept Sketch",
            caption: "Sketsa konsep final memperlihatkan detail sudut ergonomis stang dan integrasi roda depan.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/esprit-otoped/otoped-ideation-sketches.png",
            alt: "Ideation Sketches Matrix",
            caption: "Lembar eksplorasi bentuk ideasi awal menguji berbagai proporsi baji retro-futuristik.",
            aspectRatio: "16/9"
          },
          {
            src: "/projects/esprit-otoped/otoped-moodboard-esprit-s1.jpg",
            alt: "Lotus Esprit S1 Heritage Moodboard",
            caption: "Papan referensi visual mobil ikonik 1976 Lotus Esprit S1 yang menjadi inspirasi DNA bentuk.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/esprit-otoped/otoped-concept-geometry.jpg",
            alt: "Wedge Geometry Study",
            caption: "Studi geometri bidang baji tajam dan transisi sudut lipatan origami.",
            aspectRatio: "4/3"
          }
        ],
        designOptions: [
          {
            conceptName: "Konsep 1: Pure Geometric Wedge",
            description: "Menonjolkan garis lipatan kertas origami tajam khas supercar Lotus Esprit 1976.",
            image: "/projects/esprit-otoped/otoped-final-sketch.png"
          },
          {
            conceptName: "Konsep 2: Integrated Cyber Scooter",
            description: "Fairing roda tertutup penuh dengan lampu horizontal LED futuristik.",
            image: "/projects/esprit-otoped/otoped-hero-3d-render.jpg"
          }
        ]
      },
      cadAndEngineering: {
        softwareUsed: ["Rhinoceros 8", "KeyShot"],
        tolerancesMm: "±0.50 mm",
        blueprintDrawings: [
          {
            src: "/projects/esprit-otoped/otoped-detail-handlebar.jpg",
            alt: "Cockpit Handlebar Detail",
            caption: "Detail stang ergonomis minimalis dengan layar display digital terintegrasi.",
            aspectRatio: "1/1"
          },
          {
            src: "/projects/esprit-otoped/otoped-detail-wheel.jpg",
            alt: "Front Wheel & Geometric Fairing",
            caption: "Integrasi roda depan ke dalam lekuk hidung tajam yang fungsional dan aerodinamis.",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/esprit-otoped/otoped-detail-deck.jpg",
            alt: "Deck & Folding Pivot Detail",
            caption: "Mekanisme engsel lipat yang memungkinkan tiang kemudi terlipat rata ke lantai dek.",
            aspectRatio: "4/3"
          }
        ],
        explodedParts: [
          {
            id: "p-01",
            partNumber: "P-01",
            name: "Integrated Cockpit Handlebar",
            function: "Stang monocoque dengan layar status LED digital terintegrasi dan tuas akselerasi jempol.",
            material: "Die-Cast Aluminum Alloy",
            manufacturingProcess: "Die-Casting & CNC Machining",
            calloutPosition: { xPercent: 50, yPercent: 20 }
          },
          {
            id: "p-02",
            partNumber: "P-02",
            name: "Wedge Steering Column",
            function: "Tiang kemudi bersudut baji dengan engsel lipat cepat satu tuas (quick-release latch).",
            material: "6061-T6 Extruded Aluminum",
            manufacturingProcess: "Extrusion & CNC Milling",
            calloutPosition: { xPercent: 45, yPercent: 45 }
          },
          {
            id: "p-03",
            partNumber: "P-03",
            name: "Structural Deck & Battery Tray",
            function: "Dek pijakan kaki dengan kompartemen baterai lithium-ion tipis di bagian bawah.",
            material: "Carbon Fiber & Aluminum Composite",
            manufacturingProcess: "Compression Molding",
            calloutPosition: { xPercent: 55, yPercent: 75 }
          },
          {
            id: "p-04",
            partNumber: "P-04",
            name: "Enclosed Front Hub Motor",
            function: "Roda depan hub motor 350W terlindung di dalam fairing hidung baji aerodinamis.",
            material: "Polycarbonate Fairing & Alloy Rim",
            manufacturingProcess: "Injection Molding & Brushless Motor Hub",
            calloutPosition: { xPercent: 30, yPercent: 85 }
          }
        ]
      },
      prototypingAndManufacturing: {
        methods: [
          "Marker Concept Sketching",
          "3D Digital NURBS CAD Modeling",
          "KeyShot 3K High-DPI Studio Rendering"
        ],
        scale: "1:1 (Digital Concept)",
        materialsUsed: [
          "6061-T6 Aluminum Alloy",
          "Carbon Fiber Composite",
          "Impact Polycarbonate"
        ],
        steps: [
          {
            stepNumber: 1,
            title: "Studi DNA Lotus Esprit S1 (1976)",
            description: "Analisis proporsi bentuk origami baji karya Giorgetto Giugiaro dan penerapannya ke kendaraan roda dua.",
            image: "/projects/esprit-otoped/otoped-moodboard-esprit-s1.jpg"
          },
          {
            stepNumber: 2,
            title: "Sketsa Ideasi & Ergonomi Sikap Pengendara",
            description: "Menentukan tinggi stang 1080 mm dan panjang dek yang memberikan stabilitas berkendara perkotaan.",
            image: "/projects/esprit-otoped/otoped-ideation-sketches.png"
          },
          {
            stepNumber: 3,
            title: "Pemodelan 3D CAD di Rhinoceros 8",
            description: "Membangun bidang-bidang baji planar yang tegas dengan integrasi mekanisme engsel lipat.",
            image: "/projects/esprit-otoped/otoped-concept-geometry.jpg"
          },
          {
            stepNumber: 4,
            title: "Studio Rendering Resolusi Tinggi 3K",
            description: "Render studio resolusi tinggi 3058x2160 di KeyShot menampilkan bayangan tajam dan pantulan cat putih kontras hitam.",
            image: "/projects/esprit-otoped/otoped-hero-3d-render.jpg"
          }
        ]
      },
      gallery: [
        {
          src: "/projects/esprit-otoped/otoped-hero-3d-render.jpg",
          alt: "Full 3D Studio Rendering",
          caption: "Render studio resolusi tinggi 3058x2160 memperlihatkan siluet baji tajam Esprit Otoped dalam warna putih kontras hitam.",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/esprit-otoped/otoped-final-sketch.png",
          alt: "Final Design Concept Sketch",
          caption: "Sketsa konsep final memperlihatkan detail sudut ergonomis stang dan integrasi roda depan.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/esprit-otoped/otoped-ideation-sketches.png",
          alt: "Ideation Sketches Matrix",
          caption: "Lembar eksplorasi bentuk ideasi awal menguji berbagai proporsi baji retro-futuristik.",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/esprit-otoped/otoped-moodboard-esprit-s1.jpg",
          alt: "Lotus Esprit S1 Heritage Moodboard",
          caption: "Papan referensi visual mobil ikonik 1976 Lotus Esprit S1 yang menjadi inspirasi DNA bentuk.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/esprit-otoped/otoped-detail-handlebar.jpg",
          alt: "Cockpit Handlebar Detail",
          caption: "Detail stang ergonomis minimalis dengan layar display digital terintegrasi.",
          aspectRatio: "1/1"
        },
        {
          src: "/projects/esprit-otoped/otoped-detail-wheel.jpg",
          alt: "Front Wheel & Geometric Fairing",
          caption: "Integrasi roda depan ke dalam lekuk hidung tajam yang fungsional dan aerodinamis.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/esprit-otoped/otoped-slide-11-intro.png",
          alt: "Presentation Slide 11: Introduction",
          caption: "Slide presentasi portofolio: Pengenalan konsep Esprit Otoped (2925x2068).",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/esprit-otoped/otoped-slide-12-concept.png",
          alt: "Presentation Slide 12: Concept Board",
          caption: "Slide presentasi portofolio: Lembar inspirasi dan dekonstruksi bentuk Lotus Esprit.",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/esprit-otoped/otoped-slide-13-render.png",
          alt: "Presentation Slide 13: 3D Render & Engineering",
          caption: "Slide presentasi portofolio: Showcase render 3D studio dan detail engineering.",
          aspectRatio: "16/9"
        }
      ]
    }
  },
  {
    id: "automotive-wheels",
    slug: "automotive-wheels",
    title: "Automotive Styling & Wheels CAD",
    subtitle: "Rhinoceros 8 Parametric Wheels & Digital Styling Studies",
    tagline: "Exploring next-generation automotive proportions, surfacing, and high-performance rim aerodynamics",
    year: 2026,
    semester: "Semester 5",
    category: "3D Styling & CAD",
    role: "Automotive CAD Modeler & Digital Stylist",
    featured: true,
    order: 4,
    heroImage: "/projects/automotive-wheels/mazda-concept-coupe-render.jpg",
    thumbnailImage: "/projects/automotive-wheels/rhino-wheels-modelling-hero.jpg",
    software: ["Rhinoceros 8", "Adobe Photoshop Digital Painting", "Traditional Markers & Paper", "KeyShot"],
    dimensions: {
      lengthMm: 508.0, // 20-inch rim diameter
      widthMm: 279.4,  // 11J rim width
      heightMm: 508.0,
      weightGrams: 9800
    },
    cmf: {
      colors: [
        {
          name: "Satin Gunmetal Bronze",
          hex: "#524d45",
          pantone: "PMS 10398 C",
          finishType: "Metallic",
          glossLevelGU: 30
        },
        {
          name: "Soul Kodo Crimson",
          hex: "#a3131a",
          pantone: "PMS 200 C",
          finishType: "High-Gloss",
          glossLevelGU: 95
        },
        {
          name: "Castrol Motorsport Emerald",
          hex: "#00853f",
          pantone: "PMS 348 C",
          finishType: "High-Gloss",
          glossLevelGU: 90
        }
      ],
      materials: [
        {
          name: "Forged 6061-T6 Aerospace Aluminum",
          type: "Monoblock Wheel Rim",
          recyclable: true,
          notes: "High-pressure forged billet allowing razor-thin structural spoke cross-sections"
        },
        {
          name: "Dry Carbon Fiber Prepreg",
          type: "Aero Turbofan Ring Insert",
          recyclable: false,
          notes: "Autoclave cured carbon composite generating low-pressure vacuum for brake heat venting"
        },
        {
          name: "Automotive Cast Vinyl",
          type: "Racing Livery Graphics",
          recyclable: false,
          notes: "Ultra-conformable multi-layer cast film for racing competition livery"
        }
      ],
      finishes: [
        {
          name: "Smoked Clear over Brushed Face",
          technique: "CNC precision diamond cut with dark tinted acrylic clearcoat",
          tactility: "Glossy tactile machined grooves"
        },
        {
          name: "Matte Bead-Blast Barrel",
          technique: "Glass bead peening with satin ceramic protective coat",
          tactility: "Anti-brake-dust micro-textured surface"
        }
      ]
    },
    story: {
      challenge: "Mendesain velg motorsport dan rendering bodi mobil menuntut perpaduan ketat antara kekuatan struktur, efisiensi pendinginan termal rem cakram, aerodinamika rotasional, dan pemahaman mendalam tentang garis pantulan cahaya pada kurvatur bodi kendaraan.",
      contextNarrative: "Koleksi karya styling otomotif komprehensif oleh Mahdi Wirawan yang merangkum eksplorasi pemodelan 3D CAD velg performa tinggi di Rhinoceros 8, lukisan digital bodi mobil Mazda Concept Coupe di Photoshop, sketsa analog spidol marker cepat, dan karya resmi submisi Castrol Livery Contest 2024.",
      ideation: {
        narrative: "Eksplorasi dimulai dari goresan sketsa analog spidol marker di atas kertas layout untuk melatih reflek proporsi siluet grand tourer, kemudian ditingkatkan ke rendering digital Photoshop resolusi tinggi untuk memodelkan efek highlights dan shadows cat bodi mobil.",
        sketches: [
          {
            src: "/projects/automotive-wheels/automotive-marker-sketches-hero.jpg",
            alt: "Traditional Marker Sketches",
            caption: "Kumpulan sketsa mobil hand-drawn spidol marker dan pena pada kertas layout (3465x1960).",
            aspectRatio: "16/9"
          },
          {
            src: "/projects/automotive-wheels/mazda-concept-coupe-render.jpg",
            alt: "Mazda Concept Coupe Digital Painting",
            caption: "Lukisan digital Photoshop Mazda Concept Coupe (3291x1173) menampilkan proporsi coupe agresif.",
            aspectRatio: "16/9"
          },
          {
            src: "/projects/automotive-wheels/castrol-livery-3q-perspective.jpg",
            alt: "Castrol Livery 3/4 Perspective",
            caption: "Perspektif 3/4 karya kompetisi Castrol Livery Contest 2024 (1709x1709).",
            aspectRatio: "1/1"
          },
          {
            src: "/projects/automotive-wheels/castrol-livery-side-profile.jpg",
            alt: "Castrol Livery Side Profile",
            caption: "Tampak samping grafis balap dinamis hijau, merah, dan putih Castrol.",
            aspectRatio: "1/1"
          }
        ],
        designOptions: [
          {
            conceptName: "Aero Concave Multi-Spoke Rim",
            description: "Desain velg palang banyak dengan sudut cekung tajam dan turbofan pendingin rem.",
            image: "/projects/automotive-wheels/rhino-wheels-modelling-hero.jpg"
          },
          {
            conceptName: "Mazda Vision Grand Coupe",
            description: "Studi proporsi 2-door coupe bermoncong panjang terinspirasi Mazda Vision Coupe.",
            image: "/projects/automotive-wheels/mazda-concept-coupe-render.jpg"
          },
          {
            conceptName: "Castrol Racing Livery 2024",
            description: "Grafis balap dinamis kontras tinggi resmi kompetisi desain Castrol 2024.",
            image: "/projects/automotive-wheels/castrol-livery-3q-perspective.jpg"
          }
        ]
      },
      cadAndEngineering: {
        softwareUsed: ["Rhinoceros 8", "Adobe Photoshop Digital Painting", "KeyShot"],
        tolerancesMm: "±0.05 mm (Forged Wheel CNC Machining)",
        blueprintDrawings: [
          {
            src: "/projects/automotive-wheels/rhino-wheels-modelling-hero.jpg",
            alt: "Rhinoceros 8 Parametric Wheel CAD",
            caption: "Model 3D CAD velg otomotif multi-spoke parametrik dengan konstruksi cekung dan detail presisi di Rhino 8 (1600x1200).",
            aspectRatio: "4/3"
          },
          {
            src: "/projects/automotive-wheels/castrol-livery-top-view.jpg",
            alt: "Castrol Livery Top View",
            caption: "Tampak atas simetri grafis livery balap pada kap mesin, atap, dan spoiler belakang.",
            aspectRatio: "1/1"
          }
        ],
        explodedParts: [
          {
            id: "p-01",
            partNumber: "P-01",
            name: "Forged Aluminum Monoblock Face",
            function: "Struktur palang utama penopang beban radial dan torsi akselerasi.",
            material: "6061-T6 Forged Billet",
            manufacturingProcess: "5-Axis High-Speed CNC Milling",
            calloutPosition: { xPercent: 50, yPercent: 40 }
          },
          {
            id: "p-02",
            partNumber: "P-02",
            name: "Aerodynamic Turbofan Insert",
            function: "Cincin aerodinamis karbon penarik udara panas dari rotor rem karbon-keramik.",
            material: "Prepreg Carbon Fiber",
            manufacturingProcess: "Autoclave Compression Molding",
            calloutPosition: { xPercent: 50, yPercent: 65 }
          },
          {
            id: "p-03",
            partNumber: "P-03",
            name: "Lightweight Center Lock Nut",
            function: "Mur pengunci sentral khas mobil balap GT3 dengan pin pengaman ganda.",
            material: "7075-T6 Hard-Anodized Aluminum",
            manufacturingProcess: "Precision Turning & Anodizing",
            calloutPosition: { xPercent: 50, yPercent: 50 }
          }
        ]
      },
      prototypingAndManufacturing: {
        methods: [
          "Traditional Marker Hand Sketching",
          "Wacom Digital Painting in Photoshop",
          "Parametric NURBS Surfacing in Rhino 8",
          "KeyShot Studio Lighting Render"
        ],
        scale: "1:1 (20-inch Wheel Fitment)",
        materialsUsed: [
          "Forged Aerospace Alloy",
          "Carbon Fiber Composite",
          "Automotive Livery Film"
        ],
        steps: [
          {
            stepNumber: 1,
            title: "Sketsa Cepat Spidol Marker Analog",
            description: "Eksplorasi garis proporsi siluet grand tourer dan pola palang velg pada kertas sketsa marker.",
            image: "/projects/automotive-wheels/automotive-marker-sketches-hero.jpg"
          },
          {
            stepNumber: 2,
            title: "Digital Painting Rendering Bodi Mobil",
            description: "Membangun highlight pantulan cahaya studio dan bayangan dalam cat bodi mobil Mazda Concept Coupe di Photoshop.",
            image: "/projects/automotive-wheels/mazda-concept-coupe-render.jpg"
          },
          {
            stepNumber: 3,
            title: "Pemodelan 3D CAD Parametrik di Rhinoceros 8",
            description: "Membuat geometri velg 20-inci dengan polar array, pemotongan cekung (deep concave), dan fillet kontinu G2.",
            image: "/projects/automotive-wheels/rhino-wheels-modelling-hero.jpg"
          },
          {
            stepNumber: 4,
            title: "Pengembangan Grafis Balap Livery Castrol",
            description: "Merancang grafis balap dinamis sesuai template mobil kompetisi Castrol Livery Contest 2024.",
            image: "/projects/automotive-wheels/castrol-livery-3q-perspective.jpg"
          }
        ]
      },
      gallery: [
        {
          src: "/projects/automotive-wheels/mazda-concept-coupe-render.jpg",
          alt: "Mazda Concept Coupe Digital Painting",
          caption: "Render digital bodi Mazda Concept Coupe (3291x1173) mengeksplorasi proporsi grand tourer yang dramatis.",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/automotive-wheels/rhino-wheels-modelling-hero.jpg",
          alt: "Rhinoceros 8 Wheel 3D CAD Modeling",
          caption: "Model 3D CAD velg otomotif multi-spoke parametrik dengan konstruksi cekung dan detail presisi di Rhino 8.",
          aspectRatio: "4/3"
        },
        {
          src: "/projects/automotive-wheels/automotive-marker-sketches-hero.jpg",
          alt: "Traditional Marker Styling Sketches",
          caption: "Kumpulan sketsa mobil hand-drawn menggunakan spidol marker dan pena di atas kertas layout (3465x1960).",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/automotive-wheels/castrol-livery-3q-perspective.jpg",
          alt: "Castrol Livery Contest 2024 - 3/4 Front",
          caption: "Karya submisi resmi Castrol Livery Contest 2024 memperlihatkan grafis balap dinamis pada bodi mobil sport.",
          aspectRatio: "1/1"
        },
        {
          src: "/projects/automotive-wheels/castrol-livery-side-profile.jpg",
          alt: "Castrol Livery - Side Profile",
          caption: "Tampak samping grafis livery balap Castrol dengan aksen garis aerodinamis hijau, merah, dan putih.",
          aspectRatio: "1/1"
        },
        {
          src: "/projects/automotive-wheels/castrol-livery-top-view.jpg",
          alt: "Castrol Livery - Top Plan View",
          caption: "Tampak atas memperlihatkan simetri grafis kap mesin, atap, dan spoiler belakang.",
          aspectRatio: "1/1"
        },
        {
          src: "/projects/automotive-wheels/automotive-slide-15-coupe.png",
          alt: "Presentation Slide 15: Mazda Concept Coupe",
          caption: "Slide presentasi portofolio: Mazda Concept Coupe digital rendering (2924x2068).",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/automotive-wheels/automotive-slide-16-sketches.png",
          alt: "Presentation Slide 16: Marker Sketches",
          caption: "Slide presentasi portofolio: Kumpulan sketsa ideasi analog marker (2924x2068).",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/automotive-wheels/automotive-slide-18-wheels.png",
          alt: "Presentation Slide 18: Rhinoceros Wheels CAD",
          caption: "Slide presentasi portofolio: Pemodelan velg 3D CAD parametrik di Rhinoceros 8 (2924x2068).",
          aspectRatio: "16/9"
        },
        {
          src: "/projects/automotive-wheels/automotive-slide-19-castrol.png",
          alt: "Presentation Slide 19: Castrol Livery Contest",
          caption: "Slide presentasi portofolio: Karya kompetisi resmi Castrol Livery Contest (2924x2068).",
          aspectRatio: "16/9"
        }
      ]
    }
  }
];

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return PROJECTS.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}
