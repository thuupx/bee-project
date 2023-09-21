import {INestApplication, INestMicroservice} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

import {AllRpcExceptionsFilter} from '../filters'

export function registerGlobalFilters(
  app: INestApplication | INestMicroservice,
) {
  app.useGlobalFilters(new AllRpcExceptionsFilter())
}

export function registerSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Bee Project API')
    .setDescription('Bee Project API Gateway')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

export function registerShutDownHook(app: INestApplication) {
  app.enableShutdownHooks()
}
