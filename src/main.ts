import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignore data which is not in the DTO
      forbidNonWhitelisted: true, // Thrown errors on unexistent data
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Platzi store API')
    .setDescription('The Platzi Store API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors(); // open API to the world

  await app.listen(3000);
}
bootstrap();
