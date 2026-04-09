export enum CandidateStatus {
  New = 'New',
  Screening = 'Screening',
  Interview = 'Interview',
  Offer = 'Offer',
  Hired = 'Hired',
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: CandidateStatus;
  notes: string;
  createdAt: string;
}

export interface CreateCandidateDto {
  name: string;
  email: string;
  phone: string;
  position: string;
  status: CandidateStatus;
  notes?: string;
}

export type UpdateCandidateDto = Partial<CreateCandidateDto>;
