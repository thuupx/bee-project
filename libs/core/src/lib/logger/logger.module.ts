import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [LoggerService],
  exports: [],
})
export class LoggerModule {}
