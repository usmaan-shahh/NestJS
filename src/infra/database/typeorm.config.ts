import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],

  useFactory: (ConfigService: ConfigService) => ({
    type: 'postgres',
    host: ConfigService.get('DATABASE_HOST'),
    port: ConfigService.get<number>('DATABASE_PORT'),
    username: ConfigService.get('DATABASE_USER'),
    password: ConfigService.get('DATABASE_PASSWORD'),
    database: ConfigService.get('DATABASE_NAME'),
    autoLoadEntities: true,
    synchronize: false,
  }),
};
