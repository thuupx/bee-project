import {registerGlobalFilters} from '@bee-project/application'
import {ServiceName, LoggerService, initEnv} from '@bee-project/infrastructure'
import {NestFactory} from '@nestjs/core'
import {GrpcOptions, Transport} from '@nestjs/microservices'
import {join} from 'path'

initEnv()

import {AppModule} from './app/app.module'

async function bootstrap() {
  const logger = new LoggerService(ServiceName.Account)

  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_ACCOUNT_URL,
      package: ServiceName.Account,
      protoPath: join('account.proto'),
      loader: {
        includeDirs: [join('libs/infrastructure/src/lib/proto')],
      },
    },
    logger,
  })

  registerGlobalFilters(app)

  await app.listen()

  logger.log(`🚀 Account microservice is running`)
}

bootstrap()
