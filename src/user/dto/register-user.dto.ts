import {IsEmail, IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class RegisterUserDto {
  
  @IsEmail({}, { message: 'Invalid Email Format' }) email: string;
  @IsNotEmpty() @MinLength(6) @MaxLength(20) password: string;
  
}
