import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    
    constructor(private readonly authService: AuthService) {}

        @Post('register')
        async register(@Body() body: { email: string, password: string }) {
            return this.authService.register(body.email, body.password);
        }

}
