import { Module } from '@nestjs/common';

import { KafkaClientModule } from './modules/kafka-client.module';

@Module({
  imports: [KafkaClientModule],
  providers: [],
  exports: [],
})
export class CommonModule {}
