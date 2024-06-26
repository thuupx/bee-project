import {DynamicModule, Module} from '@nestjs/common'
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices'
import {Partitioners} from 'kafkajs'
import {kebabCase} from 'lodash'

import {ServiceName} from '../enums'
import {LoggerService} from '../logger'
import {KafkaLogger, getKafkaBrokers} from '../utils'

@Module({})
export class KafkaClientModule {
  static register(clientNames: ServiceName[]): DynamicModule {
    const clients: ClientProviderOptions[] = clientNames.map((name) => {
      const logger = new LoggerService(name)

      return {
        name,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: getKafkaBrokers(),
            clientId: kebabCase(name),
            logCreator: KafkaLogger(name, logger, 'ClientKafka'),
          },
          producer: {
            createPartitioner: Partitioners.DefaultPartitioner,
          },
          producerOnlyMode: true,
          consumer: {
            groupId: kebabCase(name),
          },
        },
      }
    })

    return ClientsModule.register({clients})
  }
}
