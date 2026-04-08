import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { CandidateStatus } from '../entities/candidates.entity';

export class CreateCandidateDto {
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  phone?: string;

  @IsNotEmpty()
  position?: string;

  @IsEnum(CandidateStatus)
  status?: CandidateStatus;

  @IsOptional()
  notes?: string;
}
