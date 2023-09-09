import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, ConfigModule.load()],
})
export class CoreModule {}
