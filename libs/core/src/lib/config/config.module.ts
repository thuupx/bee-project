import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigFactory,
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

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
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
