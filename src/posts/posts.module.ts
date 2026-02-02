import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { AuthGuardModule } from 'src/shared/shared-modules/auth-guard/auth.guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthGuardModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [],
})
export class PostsModule {}