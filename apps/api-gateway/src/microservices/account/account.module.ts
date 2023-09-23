import {ClientToken, KafkaClientModule} from '@bee-project/shared'
import {Module} from '@nestjs/common'

import {AccountController} from './account.controller'
import {AccountService} from './account.service'

@Module({
  imports: [KafkaClientModule.register([ClientToken.AccountMicroservice])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
