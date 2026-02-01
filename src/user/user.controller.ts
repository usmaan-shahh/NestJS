import {  Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared-modules/auth-guard/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { User } from './user.entity';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async fetchUser(@CurrentUser() User: { userId: string }) {
    return this.userService.fetchUser(User.userId);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async updateUser(@CurrentUser() user: { userId: string }, @Body() body: UpdateProfileDto
  ): Promise<User | null> {
    return await this.userService.updateProfile(user.userId, body);
  }

}