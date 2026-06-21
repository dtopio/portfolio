export interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  icon: string | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  tags: string[];
  github_url: string | null;
  demo_url: string | null;
  image: string | null;
  featured: boolean;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  location: string | null;
  type: 'work' | 'teaching' | 'education' | string;
  start_date: string;
  end_date: string | null;
  description: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiCollection<T> {
  data: T[];
}
