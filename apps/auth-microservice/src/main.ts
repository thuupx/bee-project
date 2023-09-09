import { getKafkaBrokers } from '@bee-project/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: getKafkaBrokers(),
        clientId: 'auth-microservice',
      },
    },
  });
  await app.listen();

  Logger.log(`🚀 Auth microservice is running`);
}

bootstrap();
