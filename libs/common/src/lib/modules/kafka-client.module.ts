import { ConfigModule, ConfigService } from '@bee-project/core';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ClientToken } from '../constants';

@Module({
  imports: [ConfigModule],
  providers: [],
})
export class KafkaClientModule {
  static register(name: ClientToken, clientId?: string): DynamicModule {
    return ClientsModule.registerAsync({
      clients: [
        {
          name,
          useFactory: (configService: ConfigService) => {
            const brokers = configService.get<string[]>('kafka.brokers') || [
              'localhost:9094',
            ];

            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  brokers,
                  clientId: clientId || name,
                },
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    });
  }
}
