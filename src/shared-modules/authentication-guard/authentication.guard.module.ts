import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './authentication.guard';

@Module({
  imports: [JwtModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardModule {}