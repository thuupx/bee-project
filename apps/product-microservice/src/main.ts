import {registerGlobalFilters} from '@bee-project/application'
import {ClientToken, LoggerService, initEnv} from '@bee-project/infrastructure'
import {NestFactory} from '@nestjs/core'
import {GrpcOptions, Transport} from '@nestjs/microservices'
import {join} from 'path'

initEnv()

import {AppModule} from './app/app.module'

async function bootstrap() {
  const logger = new LoggerService(ClientToken.ProductMicroservice)

  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_PRODUCT_URL,
      package: ClientToken.ProductMicroservice,
      protoPath: join('libs/infrastructure/src/lib/proto/product.proto'),
    },
    logger,
  })

  registerGlobalFilters(app)

  await app.listen()

  logger.log(`🚀 Product microservice is running`)
}

bootstrap()
