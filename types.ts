export interface Sculpture {
  id: string;
  title: string;
  year: number;
  material: string;
  dimensions: string;
  image: string;
  description: string;
  creativeProcess: string;
  inspiration: string;
  details: { label: string; text: string }[];
  featuredDescription?: string;
}

export type ViewType = 'home' | 'portfolio' | 'about' | 'project' | 'studio-portal';
