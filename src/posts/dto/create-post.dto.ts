import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  @MaxLength(200, {message: 'Title must be shorter than or equal to 200 characters'})
  title: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  @IsString()
  @MinLength(10, { message: 'Content must be at least 10 characters' })
  content: string;
}
