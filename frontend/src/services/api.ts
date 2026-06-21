import axios from 'axios';
import { API_BASE_URL } from './config';
import type { ApiCollection, ContactPayload, Experience, Project, Skill } from '../types';

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

export async function postContact(payload: ContactPayload): Promise<string> {
  const { data } = await client.post<{ message: string }>('/contact', payload);
  return data.message;
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
