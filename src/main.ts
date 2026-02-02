import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('docs', app, document);

   app.useGlobalPipes(new ValidationPipe( {whitelist: true, forbidNonWhitelisted: true, transform: true} ));
   app.use(cookieParser());
   await app.listen(process.env.PORT ?? 3000);

}

bootstrap();

// forbidNonWhitelisted: true mean's any property that isn't defined on the DTO is rejected.
// transform: true //Converts JSON into a DTO class instance.