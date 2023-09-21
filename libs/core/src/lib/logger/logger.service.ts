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

  override error<T = unknown>(message: T, stack?: string, context?: string) {
    const error: Error = {
      name: context || (this.context as string),
      stack,
      message: message as string,
    }

    if (message instanceof Error) {
      error.message = message.message
      error.stack = message.stack
    }

    super.error(error.message, error.stack, error.name)
  }
}
