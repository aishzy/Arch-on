export type ConceptTone = 'rust' | 'ink' | 'sage';

export type ConceptVariant = 'brise' | 'garden' | 'terraces' | 'river' | 'vault' | 'wind';

export type Concept = {
  slug: string;
  title: string;
  category: string;
  year: string;
  type: string;
  summary: string;
  variant: ConceptVariant;
  tone: ConceptTone;
  /** Loose geometry parameters used by the isolated concept drawings. */
  params: Record<string, number>;
};

export const concepts: Concept[] = [
  {
    slug: 'brise-soleil-grid',
    title: 'Brise-Soleil Grid',
    category: 'Facade',
    year: '2026',
    type: 'Shading screen study',
    summary: 'A cast-concrete screen that reads the sun path and thins out exactly over the desks where light is needed.',
    variant: 'brise',
    tone: 'rust',
    params: { cols: 13, rows: 9, sun: 44 },
  },
  {
    slug: 'suspended-garden',
    title: 'Suspended Garden',
    category: 'Verticality',
    year: '2026',
    type: 'Vertical greenery study',
    summary: 'Living terraces hung on a single concrete core, lowering a park through the full height of the building.',
    variant: 'garden',
    tone: 'sage',
    params: { cabins: 7, sway: 26 },
  },
  {
    slug: 'stepped-section',
    title: 'Stepped Section',
    category: 'Section',
    year: '2025',
    type: 'Terraced housing section',
    summary: 'A hillside read as a staircase of gardens, where every roof is the room above it and east light follows the slope.',
    variant: 'terraces',
    tone: 'ink',
    params: { levels: 5, stride: 96 },
  },
  {
    slug: 'river-terrace',
    title: 'River Terrace',
    category: 'Landscape',
    year: '2025',
    type: 'Riverine edge study',
    summary: 'A public terrace that steps down to the water and treats the flood margin as folding, habitable levels.',
    variant: 'river',
    tone: 'sage',
    params: { strands: 7, bays: 6 },
  },
  {
    slug: 'thin-shell-vault',
    title: 'Thin Shell Vault',
    category: 'Structure',
    year: '2026',
    type: 'Structural shell study',
    summary: 'A one-brick shell that stays up by curvature alone, drawn as a family of tightening arcs from support to keystone.',
    variant: 'vault',
    tone: 'rust',
    params: { arches: 8, crown: 340 },
  },
  {
    slug: 'wind-courtyard',
    title: 'Wind Courtyard',
    category: 'Climate',
    year: '2025',
    type: 'Passive cooling diagram',
    summary: 'A courtyard shaped like a venturi funnel, catching the evening breeze and pulling it through every shaded room.',
    variant: 'wind',
    tone: 'ink',
    params: { fins: 11, draft: 16 },
  },
];