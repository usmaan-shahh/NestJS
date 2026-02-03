import {  Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './users-service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UpdateProfileResult } from './interface/update-profile.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/core/shared/shared-decorators/currentUser.decorator';
import { AuthGuard } from 'src/core/shared/shared-modules/auth-guard/auth-guard';

@ApiTags('User')
@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'This endpoint is used to get details of the user'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  async fetchUser(@CurrentUser() User: { userId: string }) {
    return this.userService.fetchUser(User.userId);
  }

  @ApiOperation({
    summary: 'This endpoint is used to update email and password of the user',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('me')
  async updateUser(
    @CurrentUser() user: { userId: string },
    @Body() body: UpdateProfileDto,
  ): Promise<UpdateProfileResult> {
    return this.userService.updateProfile(user.userId, body);
  }
}