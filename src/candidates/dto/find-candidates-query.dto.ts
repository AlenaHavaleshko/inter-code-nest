import { IsEnum, IsOptional } from 'class-validator';
import { CandidateStatus } from '../entities/candidates.entity';

export class FindCandidatesQueryDto {
  @IsOptional()
  @IsEnum(CandidateStatus)
  status?: CandidateStatus;
}
