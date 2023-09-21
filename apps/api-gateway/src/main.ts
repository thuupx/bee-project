import {LoggerService} from '@bee-project/core'
import {ClientToken} from '@bee-project/shared'
import {INestApplication} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

import {AppModule} from './app.module'

function registerSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Bee Project API')
    .setDescription('Bee Project API Gateway')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

function enableShutDownHook(app: INestApplication) {
  app.enableShutdownHooks()
}

async function bootstrap() {
  const logger = new LoggerService(ClientToken.ApiGateway)

  const app = await NestFactory.create(AppModule, {logger})

  const PORT = process.env.PORT || 3000

  registerSwagger(app)
  enableShutDownHook(app)

  await app.listen(PORT)
  logger.log(`🚀 API Gateway is running on: http://localhost:${PORT}`)
}

bootstrap()
