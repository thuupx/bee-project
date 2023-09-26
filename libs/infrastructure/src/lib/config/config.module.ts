import {DynamicModule, Global, Module} from '@nestjs/common'
import {ConfigFactory, ConfigModule as NestConfigModule} from '@nestjs/config'

import {ConfigService} from './config.service'
import grpc from './config-maps/grpc'

@Global()
@Module({})
export class ConfigModule {
  static register(configFactories: ConfigFactory[] = []): DynamicModule {
    const envFilePath = [`.env.${process.env.NODE_ENV}`, '.env']

    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          load: [...configFactories, grpc],
          envFilePath,
          isGlobal: true,
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    }
  }
}
