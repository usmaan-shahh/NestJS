import {  Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared/shared-modules/auth-guard/auth.guard';
import { CurrentUser } from '../shared/shared-decorators/currentUser.decorator';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UpdateProfileResult } from 'src/utils/interface/update-profile.interface';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  async fetchUser(@CurrentUser() User: { userId: string }) {
    return this.userService.fetchUser(User.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('update')
  async updateUser(
    @CurrentUser() user: { userId: string },
    @Body() body: UpdateProfileDto,
  ): Promise<UpdateProfileResult> {
    return this.userService.updateProfile(user.userId, body);
  }
}