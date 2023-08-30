/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port: number = parseInt(process.env.PORT) || 4002;

  const app = await NestFactory.createMicroservice<TcpOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port,
    },
  });
  await app.listen();
  Logger.log(
    `🚀 User microservice is running on: http://localhost:${port}}`
  );
}

bootstrap();
