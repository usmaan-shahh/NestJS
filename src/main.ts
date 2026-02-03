import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './core/config/swagger.config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  //SWAGGER
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  //ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  //Cookie-Parser
  app.use(cookieParser());


  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

// forbidNonWhitelisted: true mean's any property that isn't defined on the DTO is rejected.
// transform: true //Converts JSON into a DTO class instance.