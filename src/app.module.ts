import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';


@Module
(
{
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})

export class AppModule {}
