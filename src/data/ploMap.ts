export type ProgressionStage = 'L' | 'P' | 'M';

export interface PLODefinition {
  id: number;
  title: string;
  description: string;
  mapCoverage: ProgressionStage[];
}

export const PLO_SOURCE = {
  fileName: 'DESN PLO Map.xlsx',
  revisedLabel: 'Revised 4/1/2024',
  revisedDateISO: '2024-04-01',
} as const;

export const STAGE_LABELS: Record<ProgressionStage, string> = {
  L: 'Learn',
  P: 'Practice',
  M: 'Master',
};

export const STAGE_GUIDANCE: Record<ProgressionStage, string> = {
  L: 'Introduced and scaffolded in early coursework.',
  P: 'Applied through repeated use in studio and process work.',
  M: 'Demonstrated at advanced/culminating performance level.',
};

export const PLO_DEFINITIONS: PLODefinition[] = [
  {
    id: 1,
    title: 'Visual Vocabulary',
    description: 'Achieve fluency in the visual vocabulary of design.',
    mapCoverage: ['L', 'P', 'M'],
  },
  {
    id: 2,
    title: 'Technical Skills',
    description: 'Demonstrate proficiency in the technical skills relevant to design.',
    mapCoverage: ['L', 'P', 'M'],
  },
  {
    id: 3,
    title: 'Design Methodologies',
    description:
      'Apply design methodologies including systems thinking, design thinking, inclusive design, and circular design.',
    mapCoverage: ['L', 'P', 'M'],
  },
  {
    id: 4,
    title: 'Design Process',
    description: 'Engage in a design process that includes research, ideation, and prototyping.',
    mapCoverage: ['L', 'P', 'M'],
  },
  {
    id: 5,
    title: 'Career Readiness',
    description:
      'Practice communication, leadership, equity and inclusion, professionalism, problem-solving, and presentation including portfolio.',
    mapCoverage: ['L', 'M'],
  },
  {
    id: 6,
    title: 'Well-Being',
    description: 'Employ principles of well-being to self, others, and community.',
    mapCoverage: ['L', 'P'],
  },
];

export const PLO_DEFINITIONS_TEXT = PLO_DEFINITIONS.map(
  (plo) => `PLO ${plo.id}: ${plo.title} - ${plo.description}`,
).join('\n');
