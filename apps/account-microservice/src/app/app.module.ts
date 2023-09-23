import {CoreModule} from '@bee-project/core'
import {
  ConfigModule,
  ConfigService,
  Prisma,
  PrismaModule,
} from '@bee-project/infrastructure'
import {Module} from '@nestjs/common'

import {AppController} from './app.controller'
import {AppService} from './app.service'

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
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
