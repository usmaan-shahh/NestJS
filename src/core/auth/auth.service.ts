import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { RegisterReguestDto, RegisterResponseDto } from "./dto/register.dto";
import { TokensService } from "./jwt/jwt.service";
import { Injectable } from "@nestjs/common";
import { EmailAlreadyExistsException } from "src/core/shared/auth-exceptions/email-already-exists.exception";
import * as bcrypt from "bcrypt"
import { InvalidCredentialsException } from "src/core/shared/auth-exceptions/InvalidCredentialsException";
import { UserRepository } from "src/modules/users/users-repository";
import { plainToInstance } from 'class-transformer';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokensService: TokensService,
  ) {}

  async register(body: RegisterReguestDto) {
    const { email, password } = body;
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new EmailAlreadyExistsException();
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.createUser({ email, password: hashedPassword });
    return { message: 'User registered successfully' };
  }

  async login(body: LoginRequestDto) {
    const { email, password } = body;
    const user = await this.userRepository.findByEmail(email, true);
    if (!user) throw new InvalidCredentialsException();
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new InvalidCredentialsException();
    const tokens = await this.tokensService.GenerateTokens({ sub: user.id });
    //at this point user is an object of type user entity 
    return plainToInstance(
      LoginResponseDto, 
      {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        user,
      },
    );
  }
}

//plainToInstance converts plain JavaScript object into a real LoginResponseDto class instance.