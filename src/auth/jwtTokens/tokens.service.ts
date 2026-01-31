import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


export interface TokenPayload {
  sub: string;
}

@Injectable()
export class TokensService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(payload: TokenPayload) {

   const secret = this.configService.get<string>('jwt.accessSecret')!;

    const expiresIn = this.configService.get('jwt.accessExpires',)!;

     const accessToken = this.jwtService.sign(payload, { secret: secret, expiresIn: expiresIn, });

      return accessToken   

  }
}
