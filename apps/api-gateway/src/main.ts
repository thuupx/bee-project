import {LoggerService} from '@bee-project/core'
import {
  ClientToken,
  registerGlobalFilters,
  registerShutDownHook,
  registerSwagger,
} from '@bee-project/shared'
import {NestFactory} from '@nestjs/core'

import {AppModule} from './app.module'

async function bootstrap() {
  const logger = new LoggerService(ClientToken.ApiGateway)

  const app = await NestFactory.create(AppModule, {logger})

  const PORT = process.env.PORT || 3000

  registerSwagger(app)
  registerGlobalFilters(app)
  registerShutDownHook(app)

  await app.listen(PORT)
  logger.log(`🚀 API Gateway is running on: http://localhost:${PORT}`)
}

bootstrap()
