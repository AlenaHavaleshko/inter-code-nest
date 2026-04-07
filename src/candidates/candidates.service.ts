import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidates.dto';
import { UpdateCandidateDto } from './dto/update-candidates.dto';
import { Candidate, CandidateStatus } from './entities/candidates.entity';
import { randomUUID } from 'crypto';
import { seedCandidates } from './candidates.seed';

@Injectable()
export class CandidatesService {
  private candidates: Candidate[] = seedCandidates;

  // POST /candidates
  create(_createCandidateDto: CreateCandidateDto): Candidate {
    const newCandidate: Candidate = {
      id: randomUUID(),
      createdAt: new Date(),
      ..._createCandidateDto,
    };
    this.candidates.push(newCandidate);
    return newCandidate;
  }
  // GET /candidates
  findAll(status?: CandidateStatus): Candidate[] {
    if (status) {
      return this.candidates.filter((candidate) => candidate.status === status);
    }
    return this.candidates;
  }

  // GET /candidates/:id
  findOne(id: string): Candidate | undefined {
    const candidate = this.candidates.find((candidate) => candidate.id === id);
    if (!candidate) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    return candidate;
  }
  // PATCH /candidates/:id
  update(id: string, _updateCandidateDto: UpdateCandidateDto): Candidate {
    const candidate = this.findOne(id);
    if (!candidate) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    Object.assign(candidate, _updateCandidateDto);
    return candidate;
  }
  // DELETE /candidates/:id
  remove(id: string): void {
    const index = this.candidates.findIndex((candidate) => candidate.id === id);
    if (index === -1) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    this.candidates.splice(index, 1);
  }
}
