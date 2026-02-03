import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RegisterReguestDto, RegisterResponseDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { CookieInterceptor } from "./interceptors/cookie.interceptor";
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto";

@ApiTags('Authentication')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'This endpoint is used to register a new user' })
  @Post('register')
  register(@Body() body: RegisterReguestDto): Promise<RegisterResponseDto> {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: 'This endpoint is used to login a registered user' })
  @Post('login')
  @UseInterceptors(CookieInterceptor)
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }

  @ApiOperation({ summary: 'This endpoint logouts the user' })
  @Post('logout')
  @UseInterceptors(CookieInterceptor)
  logout() {
    return {};
  }
}
