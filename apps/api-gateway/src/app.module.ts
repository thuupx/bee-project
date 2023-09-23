import {CoreModule} from '@bee-project/core'
import {ConfigModule} from '@bee-project/shared'
import {Module} from '@nestjs/common'

import {AccountModule} from './microservices/account/account.module'

@Module({
  imports: [CoreModule, ConfigModule.register(), AccountModule],
})
export class AppModule {}
