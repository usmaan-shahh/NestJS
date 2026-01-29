import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
    
    constructor(private readonly authService: AuthService) {}
    
}