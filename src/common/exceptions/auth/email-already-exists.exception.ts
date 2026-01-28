import { ConflictException } from "@nestjs/common";

export class EmailAlreadyExistsError extends ConflictException {

  constructor() {
    super('Email already exists');
  }
  
}

// All Built-In Exceptions like ConflictException extend HttpException(The Base Class for all HTTP Errors in NestJS.).