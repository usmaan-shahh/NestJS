import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from './authentication.guard';

@Module({
  imports: [JwtModule],
  providers: [AuthenticationGuard],
  exports: [AuthenticationGuard],
})
export class GuardModule {}