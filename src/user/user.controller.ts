import {  Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared-modules/auth-guard/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';


@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}


  @UseGuards(AuthGuard)
   @Get('profile')
    async fetchUser(@CurrentUser() User: { userId: string }) {
     return this.userService.findById(User.userId);
  }

}