import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
        clientId: 'user-microservice',
      },
    },
  });

  await app.listen();
  Logger.log(`🚀 User microservice is running`, 'UserMicroservice');
}

bootstrap();
