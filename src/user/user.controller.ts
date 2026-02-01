import {  Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared-modules/auth-guard/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';


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
  async updateUser(@CurrentUser() user: { userId: string }, body: { email?: string; password?: string } ) {
    await this.userService.updateProfile(user.userId, body);
    return { message: 'User updated successfully' };
  }

  // @UseGuards(AuthGuard)
  // @Delete('delete')
  // async deleteUser(@CurrentUser() user: { userId: string }) {
  //   await this.userService.delete(user.userId);
  //   return { message: 'User deleted successfully' };
  // }
}