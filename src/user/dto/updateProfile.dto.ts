import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  currentPassword?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  newPassword?: string;
}