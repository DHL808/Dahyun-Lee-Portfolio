export interface Project {
  id: string;
  title: string;
  type: string;
  year: string;
  tag: string;
  placeholder: string;
}

export interface Category {
  id: string;
  name: string;
  letter: string;
  description: string;
  projects: Project[];
}

export interface PortfolioData {
  name: string;
  role: string;
  description: string;
  email: string;
  behance: string;
  linkedin: string;
  resumeImageUrl?: string;
  categories: Category[];
}
