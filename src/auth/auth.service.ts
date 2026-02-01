import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { EmailAlreadyExistsException } from './exceptions/EmailAlreadyExistsException'
import { InvalidCredentialsException } from './exceptions/InvalidCredentialsException';
import { LoginDto } from './dto/login.dto';
import { TokensService } from './jwtTokens/tokens.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokensService: TokensService,
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

    const tokens = await this.tokensService.generateTokens({ sub: user.id });

    return { access_token: tokens.access_token, refresh_token: tokens.refresh_token };
  
  
  }


  async logout(){}













}
