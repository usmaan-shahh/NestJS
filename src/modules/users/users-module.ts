import { Module } from '@nestjs/common';
import { UserController } from './users-controller';
import { UserService } from './users-service';
import { UserRepository } from './users-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users-entity';
import { AuthGuardModule } from 'src/core/shared/shared-modules/auth-guard/auth-guard.module';
import { OrmModule } from 'src/infra/database/typeorm.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthGuardModule, OrmModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
