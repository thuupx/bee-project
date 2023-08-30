import {
  DynamicModule,
  InjectionToken,
  Module,
  Provider,
} from '@nestjs/common';

import {
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
  PrismaOptionsFactory,
} from './interfaces';
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useValue: options.prismaServiceOptions,
        },
      ],
    };
  }

  static forRootAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: PrismaModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProvider(options);
    }

    const classProvider = {
      provide: options.useClass,
      useClass: options.useClass,
    } as Provider;

    return [...this.createAsyncOptionsProvider(options), classProvider];
  }

  private static createAsyncOptionsProvider(
    options: PrismaModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    const inject = [options.useExisting ?? options.useClass].filter(
      Boolean
    ) as InjectionToken[];

    return [
      {
        provide: PRISMA_SERVICE_OPTIONS,
        useFactory: async (optionsFactory: PrismaOptionsFactory) =>
          await optionsFactory.createPrismaOptions(),
        inject,
      },
    ];
  }
}
