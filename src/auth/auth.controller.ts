import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { cookieOptions } from './config/cookieOptions';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() response) {
     const { access_token, refresh_token } =  await this.authService.login(body);
       response.cookie('refresh_token', refresh_token, cookieOptions);
         return  access_token
  } 

  @Post('logout')
  logout(@Res() response) {
    response.clearCookie('refresh_token', cookieOptions);
  }

 
}
