export enum CandidateStatus {
  New = 'New',
  Screening = 'Screening',
  Interview = 'Interview',
  Offer = 'Offer',
  Hired = 'Hired',
}

export class Candidate {
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
  position!: string;
  status!: CandidateStatus;
  notes?: string;
  createdAt!: Date;
}
