import {  Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationGuard } from '../shared-modules/authentication-guard/authentication.guard';
import { CurrentUser } from './decorators/currentUser.decorator';


@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}


  @UseGuards(AuthenticationGuard)
   @Get('profile')
    async fetchUser(@CurrentUser() User: { userId: string }) {
     return this.userService.findById(User.userId);
  }

}