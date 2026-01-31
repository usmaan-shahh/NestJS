import { JwtService } from '@nestjs/jwt';

export interface TokenPayload {
  userId: string;
}

export const generateTokens = (jwtService: JwtService, userId: string) => {

  const payload: TokenPayload = { userId };

  const accessToken = jwtService.sign(payload);

  return accessToken;

 
};
