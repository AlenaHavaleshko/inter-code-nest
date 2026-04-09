import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { CandidateStatus } from '../entities/candidates.entity';

export class CreateCandidateDto {
  @IsOptional()
  name?: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  position?: string;

  @IsOptional()
  @IsEnum(CandidateStatus)
  status?: CandidateStatus;

  @IsOptional()
  notes?: string;
}
