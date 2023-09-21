import {Module} from '@nestjs/common'
import {ClientToken, KafkaClientModule} from '@bee-project/shared'

import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'

@Module({
  imports: [KafkaClientModule.register([ClientToken.AuthMicroservice])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
