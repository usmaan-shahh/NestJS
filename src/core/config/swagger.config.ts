import { DocumentBuilder} from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

