import {CoreModule} from '@bee-project/core'
import {ConfigModule} from '@bee-project/shared'
import {Module} from '@nestjs/common'

import {AuthModule} from './microservices/auth/auth.module'
import {UserModule} from './microservices/user/user.module'

@Module({
  imports: [CoreModule, ConfigModule.register(), AuthModule, UserModule],
})
export class AppModule {}
