import {ConfigModule} from '@bee-project/infrastructure'
import {Module} from '@nestjs/common'

import {AccountModule} from './microservices/account/account.module'

@Module({
  imports: [ConfigModule.register(), AccountModule],
})
export class AppModule {}
