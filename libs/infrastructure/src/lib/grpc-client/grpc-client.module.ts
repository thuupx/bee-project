import {DynamicModule, Module} from '@nestjs/common'
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices'

import {join} from 'path'

import {ServiceName} from '../enums'

@Module({})
export class GrpcClientModule {
  static register(clientNames: ServiceName[]): DynamicModule {
    const clients: ClientProviderOptions[] = clientNames.map((name) => {
      return {
        name,
        transport: Transport.GRPC,
        options: {
          package: name,
          protoPath: `${name}.proto`,
          loader: {
            includeDirs: [join('libs/infrastructure/src/lib/proto')],
          },
        },
      }
    })

    return ClientsModule.register({clients})
  }
}
