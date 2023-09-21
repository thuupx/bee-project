import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
  Scope,
} from '@nestjs/common'

@Injectable({scope: Scope.TRANSIENT})
export class LoggerService extends ConsoleLogger {
  constructor(context: string, options: ConsoleLoggerOptions = {}) {
    super(context, options)
  }
}
