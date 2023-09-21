import {DynamicModule, Module} from '@nestjs/common'
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices'
import {Partitioners} from 'kafkajs'
import {kebabCase} from 'lodash'
import {LoggerService} from '@bee-project/core'

import {ClientToken} from '../../enums'
import {KafkaLogger, getKafkaBrokers} from '../../utils'

@Module({})
export class KafkaClientModule {
  static register(clientNames: ClientToken[]): DynamicModule {
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
