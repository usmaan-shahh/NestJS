import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { EmailAlreadyExistsException } from './standard exceptions/EmailAlreadyExistsException'
import { InvalidCredentialsException } from './standard exceptions/InvalidCredentialsException';
import { LoginDto } from './dto/login.dto';
import { generateTokens } from './generateTokens/generate-tokens';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(body: RegisterDto) {
    const { email, password } = body;

    const existing = await this.userRepository.findByEmail(email);

    if (existing) throw new EmailAlreadyExistsException();

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.createUser({ email, password: hashedPassword });

    return { message: 'You are successfully registered' };
  }

  
  async login(body: LoginDto) {
    const { email, password } = body;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsException();
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw new InvalidCredentialsException();

    const accessToken = generateTokens(this.jwtService, user.id);

    return {message: 'Login Successful', access_token: accessToken};
  }



  












}
