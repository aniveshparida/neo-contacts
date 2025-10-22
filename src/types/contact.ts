export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  notes: string;
  avatar: string | null;
  isFavorite: boolean;
  createdAt: number;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'a-z' | 'z-a' | 'recent';
