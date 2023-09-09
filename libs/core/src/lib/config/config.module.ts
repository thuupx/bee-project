import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigFactory,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static load(configFactories?: ConfigFactory[]): DynamicModule {
    const envFilePath = [`.env.${process.env.NODE_ENV}`, '.env'];

    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          load: configFactories,
          envFilePath,
          isGlobal: true,
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
