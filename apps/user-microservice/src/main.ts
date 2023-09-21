import {LoggerService} from '@bee-project/core'
import {NestFactory} from '@nestjs/core'
import {KafkaOptions, Transport} from '@nestjs/microservices'
import {Partitioners} from 'kafkajs'
import {kebabCase} from 'lodash'
import {ClientToken, KafkaLogger, getKafkaBrokers} from '@bee-project/shared'

import {AppModule} from './app/app.module'

async function bootstrap() {
  const logger = new LoggerService(ClientToken.UserMicroservice)

  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: getKafkaBrokers(),
        clientId: kebabCase(ClientToken.UserMicroservice),
        logCreator: KafkaLogger(ClientToken.UserMicroservice, logger),
      },
      producer: {
        createPartitioner: Partitioners.DefaultPartitioner,
      },
      consumer: {
        groupId: kebabCase(ClientToken.UserMicroservice),
      },
    },
    logger,
  })

  await app.listen()
  logger.log(`🚀 User microservice is running`, 'UserMicroservice')
}

bootstrap()
