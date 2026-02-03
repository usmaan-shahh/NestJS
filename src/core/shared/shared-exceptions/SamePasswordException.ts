import { BadRequestException } from '@nestjs/common';

export class SamePasswordException extends BadRequestException {

  constructor() {
    super('New Password and Old Password cannot be the same');
  }
  
}
