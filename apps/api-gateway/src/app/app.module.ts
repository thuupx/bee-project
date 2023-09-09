import { ClientToken, KafkaClientModule } from '@bee-project/common';
import { ConfigModule, CoreModule } from '@bee-project/core';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';

@Module({
  imports: [
    CoreModule,
    ConfigModule.load(),
    KafkaClientModule.register(ClientToken.ApiGateway),
  ],
  providers: [AppService],
})
export class AppModule {}
