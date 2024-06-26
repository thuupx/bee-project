import {
  ConfigModule,
  ConfigService,
  GrpcClientModule,
  PrismaModule,
  ServiceName,
} from '@bee-project/infrastructure'
import {Module} from '@nestjs/common'

import {AppController} from './app.controller'
import {AppService} from './app.service'

@Module({
  imports: [
    ConfigModule.register(),
    GrpcClientModule.register([ServiceName.Account]),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          prismaOptions: {
            datasourceUrl: configService.get<string>('prisma.productDbUrl'),
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
