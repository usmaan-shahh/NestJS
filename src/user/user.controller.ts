import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    
    constructor(private readonly authService: AuthService) {}
    
}