export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  type: string;
  studio: string;
  role: string;
  duration: string;
  tools: string;
  summary: string;
  tone: 'rust' | 'ink' | 'paper' | 'sage';
  visual: 'tower' | 'slope' | 'hall' | 'courtyard' | 'river' | 'canopy';
  body: string[];
};

export const projects: Project[] = [
  {
    slug: 'lattice-tower', title: 'Lattice Tower', category: 'Urban', year: '2026', type: 'Mixed-use tower', studio: 'Design Studio 5', role: 'Individual', duration: '14 weeks', tools: 'Rhino, Grasshopper, Enscape', tone: 'rust', visual: 'tower',
    summary: 'A mixed-use tower wrapped in a perforated screen that shades the facade and lets air move through.',
    body: ['The brief asked for 400 apartments and a public podium on a tight corner plot. I started with the climate instead of the floor plan.', 'A script turns sun-path data into the size of each opening, so every panel has a reason to be the size it is.', 'At street level the screen lifts to form a covered arcade, giving the neighbourhood a shaded place to wait, sell and meet.']
  },
  {
    slug: 'terrace-house', title: 'Terrace House on a Slope', category: 'Residential', year: '2025', type: 'Private house', studio: 'Design Studio 3', role: 'Individual', duration: '10 weeks', tools: 'Revit, hand sections, 1:50 timber model', tone: 'sage', visual: 'slope',
    summary: 'Five stacked volumes step down a hillside so every room gets a view and a roof garden.',
    body: ['The site drops six metres across the plot. Instead of cutting a flat platform, I let the house follow the slope.', 'Every roof is the next room\'s garden. The section works like a staircase for people and for rainwater.', 'Walls are rammed earth and timber, chosen because the site can supply most of the earth.']
  },
  {
    slug: 'nested-hall', title: 'Nested Hall', category: 'Cultural', year: '2026', type: 'Public reading hall', studio: 'Design Studio 5', role: 'Individual', duration: '14 weeks', tools: 'Rhino, V-Ray, Photoshop', tone: 'ink', visual: 'hall',
    summary: 'A public hall of receding arches that leads visitors from a busy street to a quiet reading room.',
    body: ['The hall is a sequence of thresholds. Each arch is slightly narrower and lower than the last, so the room quietly slows you down.', 'Light enters from the far end only. By the reading room the street noise has dropped and your eyes have adjusted to the softer light.', 'The structure is thin cast-concrete ribs with brick infill, keeping the hall cool without air-conditioning.']
  },
  {
    slug: 'courtyard-housing', title: 'Courtyard Housing', category: 'Residential', year: '2025', type: 'Social housing', studio: 'Design Studio 4', role: 'Team of three', duration: '12 weeks', tools: 'Revit, Enscape, physical model', tone: 'paper', visual: 'courtyard',
    summary: 'Forty homes around shared courtyards, with each block stepping down so light reaches the ground.',
    body: ['Social housing often forgets the space between the homes. Here the courtyards are the main event: places for children, laundry and long evening conversations.', 'The blocks step down toward the south, so every courtyard gets afternoon sun even in the shorter months.', 'Every home has a deep balcony that works as an extra room and as a shading device.']
  },
  {
    slug: 'river-edge', title: 'River Edge Masterplan', category: 'Urban', year: '2025', type: 'District masterplan', studio: 'Urban Design Studio', role: 'Team of four', duration: '8 weeks', tools: 'QGIS, Rhino, Illustrator', tone: 'sage', visual: 'river',
    summary: 'A walkable district that opens its riverbank to the public and lets the water flood safely.',
    body: ['The river was treated as a back door. The masterplan turns the blocks to face it and makes the old flood margin a continuous park.', 'Streets were narrowed and shaded, and a new promenade links the two bridges.', 'The park is designed to flood. Paths, seating and play areas sit at different heights so the space stays useful in every season.']
  },
  {
    slug: 'woven-canopy', title: 'Woven Canopy', category: 'Concept', year: '2026', type: 'Form study', studio: 'Computational design elective', role: 'Individual', duration: '6 weeks', tools: 'Grasshopper, laser cutter', tone: 'rust', visual: 'canopy',
    summary: 'A market canopy drawn from hundreds of lines that tighten where the load is highest.',
    body: ['This started as a script, not a building. A small algorithm draws a surface as a grid of lines and lets them crowd together where the structure needs to be stiffer.', 'Built at 1:20 from strips of laser-cut card, the canopy became a stiff, light shell that two people could lift.', 'The next step is to test the same logic in bamboo, which is cheap, local, and bends the way the model predicts.']
  }
];

export const notes = [
  { title: 'Shade before glass', date: 'March 2026', text: 'In hot climates the first design move should be a roof, not a window. I sketch the shadow a building casts at 3 pm before I draw a single wall.' },
  { title: 'Drawing by hand in the age of renders', date: 'January 2026', text: 'A render shows a decision that has already been made. A hand sketch is where the decision happens.' },
  { title: 'Thresholds are rooms', date: 'November 2025', text: 'The step between street and door is usually treated as leftover space. In three projects it became the most used room.' }
];
