import { CoreModule } from '@bee-project/core';
import { PrismaModule } from '@bee-project/prisma';
import { ConfigModule, ConfigService } from '@bee-project/shared';
import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AppService } from './app.service';

@Module({
  imports: [
    CoreModule,
    ConfigModule.register(),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          prismaOptions:
            configService.get<Prisma.PrismaClientOptions>('prisma'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
