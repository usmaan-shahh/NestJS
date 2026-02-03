import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './core/auth/jwt/jwt.config';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './modules/users/users-module';
import { PostsModule } from './modules/posts/posts.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [jwtConfig] }), AuthModule, UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
