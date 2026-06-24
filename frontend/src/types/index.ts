export interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  icon: string | null;
  featured: boolean;
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

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string | null;
  read_at: string | null;
}

export interface NewProjectPayload {
  title: string;
  description: string;
  tech_stack: string[];
  tags: string[];
  github_url: string | null;
  demo_url: string | null;
  featured: boolean;
}

export interface NewExperiencePayload {
  title: string;
  organization: string;
  location: string | null;
  type: 'work' | 'teaching' | 'education';
  start_date: string;
  end_date: string | null;
  description: string | null;
}

export interface UpdateSkillPayload {
  name: string;
  category: string;
  level: string;
  icon: string | null;
  featured: boolean;
}

export type NewSkillPayload = UpdateSkillPayload;

export interface Profile {
  id: number;
  bio: string;
  location: string | null;
  tagline: string | null;
  summary: string | null;
  stack: string[];
  has_cv: boolean;
  cv_filename: string | null;
  cv_uploaded_at: string | null;
}

export interface UpdateProfilePayload {
  bio: string;
  location: string | null;
  tagline: string | null;
  summary: string | null;
  stack: string[];
}

export interface ApiCollection<T> {
  data: T[];
}
