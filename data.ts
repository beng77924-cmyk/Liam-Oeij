import { Sculpture } from './types';

export const SCULPTURES: Sculpture[] = [
  {
    id: 'morphic-flow-i',
    title: 'Morphic Flow I',
    year: 2025,
    material: 'Carrara Marble',
    dimensions: '82 × 45 × 38 cm',
    image: '/src/assets/images/sculpture_hero_1782716827016.jpg',
    description: 'An exploration of organic fluid dynamics captured in solid stone. Morphic Flow I challenges the rigid permanence of marble by introducing gentle, cascading ripples that mimic water in motion.',
    featuredDescription: 'Exploring the quiet paradox of solid carrara marble shaped with fluid, ripple-like contours that seem to shift under changing light.',
    creativeProcess: 'Carved over a period of seven months from a single, hand-selected block of Statuario Carrara marble. The process involved traditional hand-chiseling followed by hundreds of hours of fine hand-sanding to achieve a velvet-matte finish that responds dynamically to soft shadows.',
    inspiration: 'Inspired by the slow, relentless erosion patterns of glacial meltwater against ancient riverbeds—reflecting the quiet collision between geological time and transient liquid forms.',
    details: [
      { label: 'Form', text: 'Fluid biomorphic contours, soft undulations.' },
      { label: 'Weight', text: 'Approx. 42 kg' },
      { label: 'Exhibition History', text: 'Solo Exhibition "Liquid Core", Venice Biennale Satellite, 2025.' },
      { label: 'Acquisition', text: 'Available through Studio Liam Oeij.' }
    ]
  },
  {
    id: 'monolith-void',
    title: 'Monolith & Void',
    year: 2025,
    material: 'Raw Granite & Polished Obsidian',
    dimensions: '145 × 32 × 28 cm',
    image: '/src/assets/images/sculpture_monolith_1782716844577.jpg',
    description: 'A study in extreme material contrast, pairing rough-hewn, jagged granite with a high-gloss, reflective obsidian cleft.',
    featuredDescription: 'A dialogue of opposites. An imposing structure of raw, rugged granite split open to reveal an impeccably polished, dark reflective interior void.',
    creativeProcess: 'The granite body was split along natural faults using historical wedges and shims to preserve its brutal, fractured outer texture. The interior obsidian cleft was meticulously ground, polished to a perfect mirror finish, and inlaid to create an illusion of a deep, endless void within the solid column.',
    inspiration: 'An investigation of the duality of nature—the rugged, chaotic exterior of the earth concealing deep, silent, perfectly ordered tectonic secrets.',
    details: [
      { label: 'Form', text: 'Vertical monolithic column, geometric interior split.' },
      { label: 'Weight', text: 'Approx. 110 kg' },
      { label: 'Exhibition History', text: 'Acquisition Selection, Municipal Gallery of Contemporary Art, Rotterdam.' },
      { label: 'Acquisition', text: 'Private Collection, Geneva.' }
    ]
  },
  {
    id: 'tension-balance',
    title: 'Tension of Balance',
    year: 2026,
    material: 'Charred Cedar & Cast Bronze',
    dimensions: '95 × 60 × 40 cm',
    image: '/src/assets/images/sculpture_wood_bronze_1782716860077.jpg',
    description: 'An asymmetrical composition exploring gravity, suspension, and the physical dialog between charred wood and molten metal.',
    featuredDescription: 'An elegant composition of weight and lightness, utilizing charred Shou Sugi Ban cedar wood to suspend a cast bronze wing in perfect architectural equilibrium.',
    creativeProcess: 'The wooden element was treated using the traditional Japanese Shou Sugi Ban technique, heavily carbonizing the surface to create a rich, tactile, deep-black texture. The bronze element was cast using the lost-wax process and hand-patinated to a warm golden-brown sheen before being joined with millimeter-level structural precision.',
    inspiration: 'The delicate, unseen forces that hold celestial bodies in equilibrium, translated into a physical tension between heavy bronze and carbonized wood.',
    details: [
      { label: 'Form', text: 'Asymmetric kinetic suspension.' },
      { label: 'Weight', text: 'Approx. 28 kg' },
      { label: 'Exhibition History', text: 'Featured at Design Miami/Basel, "New Minimalist Sculptors" Pavilion.' },
      { label: 'Acquisition', text: 'Available through Gallery Obscura.' }
    ]
  },
  {
    id: 'aetherial-rings',
    title: 'Aetherial Rings',
    year: 2026,
    material: 'Semi-Translucent Alabaster',
    dimensions: '54 × 54 × 22 cm',
    image: '/src/assets/images/sculpture_alabaster_1782716875106.jpg',
    description: 'Interlinked continuous rings carved from a singular block of Italian alabaster, exploring translucency and light refraction.',
    creativeProcess: 'Extremely delicate hand-carving was required to hollow out the interlocking rings without fracturing the crystalline structure. The material\'s thickness was varied from 5mm to 20mm, allowing light to glow with differing intensities across its form.',
    inspiration: 'Capturing the intangible quality of atmospheric light and giving it a heavy, tactile, yet luminous physical body.',
    details: [
      { label: 'Form', text: 'Interlocking geometric rings, hollow core.' },
      { label: 'Weight', text: 'Approx. 15 kg' },
      { label: 'Exhibition History', text: 'Group Exhibition "Prisms of Light", Zurich, 2026.' },
      { label: 'Acquisition', text: 'Available through Studio Liam Oeij.' }
    ]
  }
];

export const ARTIST_INFO = {
  name: 'Liam Oeij',
  title: 'Contemporary Sculptor',
  location: 'Based in Rotterdam, The Netherlands',
  studioImage: '/src/assets/images/artist_studio_1782716889787.jpg',
  bio: [
    'Liam Oeij (b. 1989) is a contemporary sculptor and visual artist whose work lies at the intersection of classical craftsmanship and modern abstraction. Operating from his light-filled studio in the post-industrial harbor of Rotterdam, he creates sculptures that invite deep contemplation on form, materiality, and the quiet passage of time.',
    'After studying fine arts and sculpture at the Royal Academy of Art, The Hague, Liam spent several years working in the marble quarries of Carrara, Italy. This formative experience instilled in him a deep respect for natural mediums and the geologic histories they carry. He has since developed an acclaimed practice that merges traditional subtractive carving techniques with high-end, innovative material pairings.'
  ],
  artisticVision: [
    'Liam\'s artistic practice is characterized by a commitment to absolute reduction. By stripping away extraneous ornament, he seeks to highlight the intrinsic language of the material itself—the cool weight of marble, the porous grit of granite, the warm density of wood, and the fluid reflectivity of bronze.',
    'His work often investigates dualities: raw versus polished, weight versus weightlessness, organic fluidity versus geometric precision. Each sculpture is designed to act as a silent monolith, interacting with the surrounding space, absorbing and reflecting natural daylight to create a shifting visual experience throughout the day.'
  ],
  workingProcess: [
    'Every piece begins with extensive material exploration. Liam personally visits stone yards and timber forests, seeking materials that exhibit unique irregularities, fissures, or grain patterns that speak of their origin.',
    'Once in the studio, the process is highly physical and meditative. Liam balances the use of power tools for initial bulk reduction with painstaking, slow hand-chiseling, rasping, and fine hand-sanding. A single sculpture can take anywhere from three months to a year to complete. This deliberate deceleration is a central tenet of his philosophy—a quiet rebellion against the hyper-acceleration of contemporary digital life.'
  ],
  materialsList: [
    { name: 'Carrara Marble', description: 'Acquired from Tuscany, valued for its fine crystalline structure and soft, light-filtering surface properties.' },
    { name: 'Belgian Blue Stone', description: 'A fossiliferous limestone that reveals deep charcoal tones when polished and a pale blue-gray when rough-hewn.' },
    { name: 'Charred Cedar (Shou Sugi Ban)', description: 'An ancient Japanese carbonization technique that preserves wood while adding a velvety, light-absorbing black patina.' },
    { name: 'Polished Bronze & Obsidian', description: 'Used to introduce high-contrast reflective planes that interact with natural light and double the spatial perception.' }
  ],
  studioPractice: 'The studio operates on a slow-production philosophy. Every sculpture is entirely unique, designed and completed from start to finish by Liam Oeij himself. There is no mass fabrication or digital replication; each piece is an unrepeatable record of a physical dialogue between the sculptor\'s hand and the ancient materials of the earth.'
};
