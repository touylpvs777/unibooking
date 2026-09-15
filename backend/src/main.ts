import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = Number(process.env.PORT ?? 8001);

  await app.listen(port, '0.0.0.0');
  Logger.log(`DK Rental API listening on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
