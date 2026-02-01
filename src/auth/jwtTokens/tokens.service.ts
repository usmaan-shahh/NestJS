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

  async generateTokens(payload: TokenPayload) {

   const accessSecret = this.configService.get<string>('jwt.accessSecret')!;

    const accessExpires = this.configService.get('jwt.accessExpires',)!;

     const refreshSecret = this.configService.get<string>('jwt.refreshSecret')!;

      const refreshExpires = this.configService.get('jwt.refreshExpires')!;

       const accessToken = this.jwtService.sign(payload, { secret: accessSecret, expiresIn: accessExpires, });

        const refreshToken = this.jwtService.sign(payload, { secret: refreshSecret, expiresIn: refreshExpires, });

         return { access_token: accessToken, refresh_token: refreshToken }   

  }
}
