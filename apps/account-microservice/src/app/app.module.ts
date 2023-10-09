import {
  ConfigModule,
  ConfigService,
  PrismaModule,
} from '@bee-project/infrastructure'
import {Module} from '@nestjs/common'

import {AppController} from './app.controller'
import {AppService} from './app.service'

@Module({
  imports: [
    ConfigModule.register(),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          prismaOptions: {
            datasourceUrl: configService.get<string>('prisma.accountDbUrl'),
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
