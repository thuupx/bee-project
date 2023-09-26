import {registerGlobalFilters} from '@bee-project/application'
import {ClientToken, LoggerService, initEnv} from '@bee-project/infrastructure'
import {NestFactory} from '@nestjs/core'
import {GrpcOptions, Transport} from '@nestjs/microservices'
import {join} from 'path'

initEnv()

import {AppModule} from './app/app.module'

async function bootstrap() {
  const logger = new LoggerService(ClientToken.AccountMicroservice)

  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_ACCOUNT_URL,
      package: ClientToken.AccountMicroservice,
      protoPath: join('libs/infrastructure/src/lib/proto/account.proto'),
    },
    logger,
  })

  registerGlobalFilters(app)

  await app.listen()

  logger.log(`🚀 Account microservice is running`)
}

bootstrap()
