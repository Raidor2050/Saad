# Architecture

## System Overview

The Saadman Saif Deep Ancestry Platform is a Next.js 16 web application with a modular architecture designed for genealogy research, visualization, and interactive exploration.

## Directory Structure

```
src/
├── app/
│   ├── globals.css          # Design system (AMOLED + gold)
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page (single-page app)
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx        # Landing hero with animated graph
│   │   ├── ResearchStats.tsx      # Animated research statistics
│   │   └── AncestralDepthViz.tsx  # "How Far Back" visualization
│   ├── graph/
│   │   ├── FamilyGraph.tsx        # React Flow + ELK.js graph
│   │   └── PersonNode.tsx         # Custom React Flow node
│   ├── timeline/
│   │   └── TimelineSection.tsx    # Historical timeline
│   ├── sources/
│   │   └── SourceExplorer.tsx     # Source browsing and filtering
│   ├── frontier/
│   │   ├── FrontierSection.tsx    # Research frontier visualization
│   │   └── MethodologySection.tsx # Research methodology documentation
│   ├── motion/
│   │   ├── ParticleBackground.tsx # Canvas particle animation
│   │   ├── CinematicSection.tsx   # Remotion video wrapper
│   │   └── RemotionPlayer.tsx     # Remotion Player integration
│   └── layout/
│       ├── Navigation.tsx         # Fixed navigation bar
│       └── Footer.tsx             # Site footer
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   ├── utils.ts             # Utility functions
│   └── data/
│       └── genealogy.ts     # All genealogy data, sources, evidence
├── stores/
│   └── useAncestryStore.ts  # Zustand state management
└── remotion/
    ├── Root.tsx             # Remotion composition definitions
    └── JourneyVideo.tsx     # Cinematic journey video
```

## Data Flow

```
Genealogy Data (genealogy.ts)
    ↓
Zustand Store (useAncestryStore.ts)
    ↓
React Components
    ↓
React Flow (Family Graph)
Recharts (Statistics)
Remotion (Cinematic Video)
Custom Canvas (Particles, Animations)
```

## Key Architectural Decisions

1. **Single-Page Application** — All sections on one page with smooth scroll navigation
2. **Static Generation** — Pre-rendered at build time for GitHub Pages compatibility
3. **Client-Side Interactivity** — All interactive components are "use client" for browser APIs
4. **Data Separation** — Clear distinction between user-provided, discovered, inferred, and candidate data
5. **Evidence-Based** — Every person and relationship has supporting evidence and confidence scores

## Visualization Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Family Graph | React Flow + ELK.js | Interactive ancestral graph |
| Timeline | Custom React + CSS | Historical timeline |
| Motion Video | Remotion | Cinematic "Journey Through Time" |
| Particles | Canvas API | Ambient background effects |
| Statistics | Animated numbers | Research metrics |
| Charts | Recharts | Data visualization |
