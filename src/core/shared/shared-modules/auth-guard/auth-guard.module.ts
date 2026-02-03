import { Module } from '@nestjs/common';
import { AuthGuard } from './auth-guard';
import { JwtConfigModule } from '../jwt-config/jwt-config.module';

@Module({
  imports: [JwtConfigModule],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtConfigModule],
})
export class AuthGuardModule {}