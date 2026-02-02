import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

  @ApiTags('Authentication')
  @Controller('/api/v1/auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiOperation({ summary: 'This endpoint is used to register a new user' })
    @Post('register')
    register(@Body() body: RegisterDto) {
      return this.authService.register(body);
    }

    @ApiOperation({
      summary: 'This endpoint is used to login a registered user',
    })
    @Post('login')
    @UseInterceptors(CookieInterceptor)
    async login(@Body() body: LoginDto) {
      return await this.authService.login(body);
    }

    @ApiOperation({summary: 'This endpoint logouts the user'})
    @Post('logout')
    @UseInterceptors(CookieInterceptor)
    logout() {
      return {
        logout: true,
        message: 'User logged Out, Please Login to Continue',
      };
    }
  }
