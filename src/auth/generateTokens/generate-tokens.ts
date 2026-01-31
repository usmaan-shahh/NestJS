import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface TokenPayload {
  sub: string;
}

@Injectable()
export class generateTokens {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(payload: TokenPayload) {
    const accessTokenSecret = this.configService.get('ACCESS_TOKEN_SECRET');
    const refreshTokenExpiresIn = this.configService.get('ACCESS_TOKEN_EXPIRES');
    const accessToken = this.jwtService.sign(payload, { secret:accessTokenSecret, expiresIn:refreshTokenExpiresIn });
    return accessToken   
  }
}
