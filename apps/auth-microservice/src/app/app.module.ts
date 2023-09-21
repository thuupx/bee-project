import {CoreModule} from '@bee-project/core'
import {ConfigModule} from '@bee-project/shared'
import {Module} from '@nestjs/common'

import {AppController} from './app.controller'
import {AppService} from './app.service'

@Module({
  imports: [CoreModule, ConfigModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
