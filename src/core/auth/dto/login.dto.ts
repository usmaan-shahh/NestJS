import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}

export class LoginRequestDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

export class LoginResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
