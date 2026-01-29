import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { EmailAlreadyExistsError } from '../common/exceptions/user/email-already-exists.exception';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyExistsError();
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      email: dto.email,
      password: hashedPassword,
    });
    const { password: _, ...result } = user;
    return result;
  }

  async login(dto: LoginDto): Promise<{ user: Omit<User, 'password'> }> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { password: _, ...result } = user;
    return { user: result };
  }

  logout(): { message: string } {
    return { message: 'Logged out' };
  }

  getMe(): { message: string } {
    return { message: 'Use a guard to attach user to request, then return req.user' };
  }
}



