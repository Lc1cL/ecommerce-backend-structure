import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist:true })); 
  
  const swaggerConfig = new DocumentBuilder()
  .setTitle('ecommercem4')
  .setDescription('Api construida con Nest para ser empleada como una plataforma de e-commerce del modulo 4 de Henry')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  
  const document= SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(PORT);
  console.log('Server listening on port 3000')
}
bootstrap();
