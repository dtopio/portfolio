import axios from 'axios';
import { API_BASE_URL } from './config';
import type {
  ApiCollection,
  ContactPayload,
  Experience,
  NewExperiencePayload,
  NewProjectPayload,
  Profile,
  Project,
  Skill,
  UpdateProfilePayload,
  UpdateSkillPayload,
} from '../types';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
});

export async function getSkills(): Promise<Skill[]> {
  const { data } = await client.get<ApiCollection<Skill>>('/skills');
  return data.data;
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await client.get<ApiCollection<Project>>('/projects');
  return data.data;
}

export async function getExperience(): Promise<Experience[]> {
  const { data } = await client.get<ApiCollection<Experience>>('/experience');
  return data.data;
}

export async function getProfile(): Promise<Profile> {
  const { data } = await client.get<{ data: Profile }>('/profile');
  return data.data;
}

export async function postContact(payload: ContactPayload): Promise<string> {
  const { data } = await client.post<{ message: string }>('/contact', payload);
  return data.message;
}

function authHeader(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function createProject(payload: NewProjectPayload, token: string): Promise<Project> {
  const { data } = await client.post<{ data: Project }>('/projects', payload, authHeader(token));
  return data.data;
}

export async function createExperience(
  payload: NewExperiencePayload,
  token: string
): Promise<Experience> {
  const { data } = await client.post<{ data: Experience }>(
    '/experience',
    payload,
    authHeader(token)
  );
  return data.data;
}

export async function updateProject(
  id: number,
  payload: NewProjectPayload,
  token: string
): Promise<Project> {
  const { data } = await client.put<{ data: Project }>(
    `/projects/${id}`,
    payload,
    authHeader(token)
  );
  return data.data;
}

export async function updateExperience(
  id: number,
  payload: NewExperiencePayload,
  token: string
): Promise<Experience> {
  const { data } = await client.put<{ data: Experience }>(
    `/experience/${id}`,
    payload,
    authHeader(token)
  );
  return data.data;
}

export async function updateSkill(
  id: number,
  payload: UpdateSkillPayload,
  token: string
): Promise<Skill> {
  const { data } = await client.put<{ data: Skill }>(`/skills/${id}`, payload, authHeader(token));
  return data.data;
}

export async function updateProfile(
  payload: UpdateProfilePayload,
  token: string
): Promise<Profile> {
  const { data } = await client.put<{ data: Profile }>('/profile', payload, authHeader(token));
  return data.data;
}

export function isAxiosValidationError(
  error: unknown
): error is { response: { status: 422; data: { message: string; errors: Record<string, string[]> } } } {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === 422 &&
    typeof error.response.data?.message === 'string'
  );
}
