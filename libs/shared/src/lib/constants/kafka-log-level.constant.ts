import { LogLevel } from '@nestjs/common';

import { KafkaLogLevel } from '../enums';

export const KAFKA_LOG_LEVEL_MAP: Record<KafkaLogLevel, LogLevel> = {
  [KafkaLogLevel.NOTHING]: 'log',
  [KafkaLogLevel.ERROR]: 'error',
  [KafkaLogLevel.WARN]: 'warn',
  [KafkaLogLevel.INFO]: 'log',
  [KafkaLogLevel.DEBUG]: 'debug',
};
