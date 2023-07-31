import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignore data which is not in the DTO
      forbidNonWhitelisted: true, // Thrown errors on unexistent data
    }),
  );
  await app.listen(3000);
}
bootstrap();
