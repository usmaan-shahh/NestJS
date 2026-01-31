import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}

// All Built-In Exceptions like ConflictException extend HttpException(The Base Class for all HTTP Errors in NestJS.).