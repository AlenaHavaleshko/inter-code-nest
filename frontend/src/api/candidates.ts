import { CandidateStatus } from '../types/candidate';
import type { Candidate, CreateCandidateDto, UpdateCandidateDto } from '../types/candidate';

const BASE = '/api/candidates';

export async function getCandidates(status?: CandidateStatus): Promise<Candidate[]> {
  const url = status ? `${BASE}?status=${encodeURIComponent(status)}` : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch candidates');
  return res.json();
}

export async function createCandidate(dto: CreateCandidateDto): Promise<Candidate> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? 'Failed to create candidate');
  }
  return res.json();
}

export async function updateCandidate(id: string, dto: UpdateCandidateDto): Promise<Candidate> {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? 'Failed to update candidate');
  }
  return res.json();
}

export async function deleteCandidate(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete candidate');
}
