import {LoggerService} from '@bee-project/core'
import {
  ClientToken,
  KafkaLogger,
  getKafkaBrokers,
  registerGlobalFilters,
} from '@bee-project/shared'
import {NestFactory} from '@nestjs/core'
import {KafkaOptions, Transport} from '@nestjs/microservices'
import {Partitioners} from 'kafkajs'
import {kebabCase} from 'lodash'

import {AppModule} from './app/app.module'

async function bootstrap() {
  const logger = new LoggerService(ClientToken.AuthMicroservice)

  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: getKafkaBrokers(),
        clientId: kebabCase(ClientToken.AuthMicroservice),
        logCreator: KafkaLogger(ClientToken.AuthMicroservice, logger),
      },
      producer: {
        createPartitioner: Partitioners.DefaultPartitioner,
      },
      consumer: {
        groupId: kebabCase(ClientToken.AuthMicroservice),
      },
    },
    logger,
  })

  registerGlobalFilters(app)

  await app.listen()

  logger.log(`🚀 Auth microservice is running`)
}

bootstrap()
