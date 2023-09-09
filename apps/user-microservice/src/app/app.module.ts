import { ClientToken, KafkaClientModule } from '@bee-project/common';
import { ConfigModule, ConfigService } from '@bee-project/core';
import { PrismaModule } from '@bee-project/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.load(),
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
    KafkaClientModule.register(ClientToken.UserMicroservice),
  ],
  providers: [AppService],
})
export class AppModule {}
