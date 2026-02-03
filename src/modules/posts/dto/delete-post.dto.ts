import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePostDto {
  @IsNotEmpty({ message: 'Post ID should not be empty' })
  @IsUUID('4', { message: 'Post ID must be a valid UUID' })
  id: string;
}
