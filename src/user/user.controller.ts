import {  Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserRepository } from './user.repository';
import { CurrentUser } from './decorators/currentUser.decorator';


@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService, 
             
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async fetchUser(@CurrentUser() User: { userId: string }) {
    return this.userService.findById(User.userId);
  }

}