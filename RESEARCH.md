# Research Report

## GitHub Projects Investigated

### Genealogy / Family Tree
| Project | Stars | License | Adopted | Notes |
|---------|-------|---------|---------|-------|
| bkrem/react-d3-tree | 1,200 | MIT | No | SVG-based, limited scale |
| family-chart (donatso) | 768 | MIT | Evaluated | Good family features |
| js_family_tree | 82 | GPL-3.0 | No | Too small, GPL |
| PeWu/topola-viewer | 331 | MIT | Evaluated | Good TypeScript support |
| genea-app/genea-app | 273 | MIT | Evaluated | Serverless reference |
| ErikGartner/dTree | 556 | MIT | Evaluated | D3-based, good features |

### Graph Visualization
| Project | Stars | License | Adopted | Notes |
|---------|-------|---------|---------|-------|
| @xyflow/react (React Flow) | 29K+ | MIT | **YES** | Primary graph renderer |
| elkjs | 2,717 | EPL-2.0 | **YES** | Primary layout engine |
| Cytoscape.js | 11K+ | MIT | No | Overkill for family trees |
| Sigma.js | 12K+ | MIT | Fallback | For 5K+ nodes |
| @antv/g6 | 11K+ | MIT | Evaluated | Powerful but complex |
| vis-network | 3,500+ | Apache-2.0 | No | Stale React wrapper |
| dagre | 3.4K+ | MIT | Evaluated | Simpler than ELK |

### OSINT / Entity Resolution
| Project | Stars | License | Adopted | Notes |
|---------|-------|---------|---------|-------|
| Splink | 2,359 | MIT | Evaluated | Best probabilistic linkage |
| dedupe | 3,200 | MIT | Evaluated | Good for prototyping |
| python-recordlinkage | 700 | BSD | Evaluated | Clean primitives |
| Zingg | 2K | AGPL-3.0 | No | License restrictive |
| SpiderFoot | 21,400 | MIT | Evaluated | Architecture reference |
| SearXNG | 32K | AGPL-3.0 | Evaluated | Search aggregation |
| RapidFuzz | 4,082 | MIT | Evaluated | Best name matching |

### OCR / Document Processing
| Project | Stars | License | Adopted | Notes |
|---------|-------|---------|---------|-------|
| PaddleOCR | 47K+ | Apache-2.0 | Evaluated | Best Bengali support |
| Tesseract | 65K+ | Apache-2.0 | Evaluated | Lightweight alternative |
| EasyOCR | 24K+ | Apache-2.0 | Evaluated | Good accuracy |

### Genealogy Platforms
| Project | Stars | License | Adopted | Notes |
|---------|-------|---------|---------|-------|
| Gramps | 3,000 | GPL-2.0 | Evaluated | Gold standard, data model reference |
| Webtrees | 805 | GPL-3.0 | Evaluated | Good API architecture |

### GEDCOM
| Project | Stars | License | Adopted | Notes |
|---------|-------|---------|---------|-------|
| tmcw/gedcom | 186 | MIT | Evaluated | TypeScript parser |
| python-gedcom | 173 | GPL-2.0 | Evaluated | Python parser |

## Technology Decisions

### Primary Stack
- **Graph:** React Flow + ELK.js (layered layout)
- **Motion:** Remotion (cinematic video)
- **Animation:** Framer Motion + Canvas API
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **State:** Zustand
- **Charts:** Recharts

### Why React Flow + ELK.js
1. React Flow renders rich custom nodes (person cards with photos, dates, confidence)
2. ELK.js provides beautiful hierarchical layouts respecting generation layers
3. Both have excellent TypeScript support
4. Both are MIT/EPL licensed
5. React Flow has 29K+ GitHub stars with active maintenance
6. Built-in zoom, pan, minimap, and virtualization

### Why Remotion
1. Programmatic video generation from React components
2. Perfect for "Journey Through Time" cinematic experience
3. Uses same React component model as the rest of the app
4. Can generate MP4 exports for sharing

## Design Language

Adopted patterns from:
- **Ancestry.com** — Person cards, relationship display
- **Bloomberg Terminal** — Data-heavy dashboard aesthetic
- **Google Arts & Culture** — Historical archive presentation
- **SpiderFoot** — OSINT investigation dashboard
- **Monument Valley (game)** — Cinematic visual style

Color palette: AMOLED black (#000000) + Archival Gold (#d4940a) + Glassmorphism
