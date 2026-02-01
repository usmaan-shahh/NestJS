import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokensService } from './jwtTokens/tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';

@Module
({
  imports: [UserModule, JwtModule], //JwtModule creates JwtService provider
  controllers: [AuthController],
  providers: [AuthService, TokensService, AuthGuard],
  exports: [AuthService, AuthGuard],
})

export class AuthModule {}
