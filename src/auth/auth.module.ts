import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokensService } from './jwtTokens/tokens.service';
import { JwtConfigModule } from '../shared/shared-modules/jwt-config/jwt-config.module';

@Module({
  imports: [UserModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthService, TokensService],
  exports: [AuthService],
})
export class AuthModule {}
