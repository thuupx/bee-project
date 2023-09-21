import {LoggerService} from '@bee-project/core'
import {ArgumentsHost, Catch} from '@nestjs/common'
import {
  BaseRpcExceptionFilter,
  KafkaRetriableException,
} from '@nestjs/microservices'
import {Observable, of} from 'rxjs'

import {ServiceException} from '../exceptions/service.exception'
import {IErrorResponse} from '../interfaces'
import {KafkaJSNumberOfRetriesExceeded} from 'kafkajs'

@Catch()
export class AllRpcExceptionsFilter extends BaseRpcExceptionFilter<
  any,
  IErrorResponse
> {
  private readonly loggerService: LoggerService

  constructor() {
    super()

    this.loggerService = new LoggerService(AllRpcExceptionsFilter.name)

    process.on('unhandledRejection', (error: any) => {
      this.loggerService.error(
        error,
        error?.stack || error,
        'UNHANDLED_REJECTION',
      )
    })
  }

  override catch(exception: Record<string, unknown>, host: ArgumentsHost) {
    const rpcHost = host.switchToRpc()
    const payload = rpcHost.getData()

    if (exception instanceof ServiceException) {
      return this.catchServiceException(exception, payload)
    } else if (exception instanceof KafkaRetriableException) {
      return this.catchKafkaRetriableException(exception, payload)
    }

    return this.catchUnknownException(exception, payload)
  }

  catchServiceException(
    exception: ServiceException,
    payload: any,
  ): Observable<IErrorResponse> {
    const {errorCode, error} = exception.getResponse()

    this.loggerService.error({error, errorCode})

    return of({
      errorCode: 'SERVICE_ERROR',
      error: exception.getError().toString(),
      data: payload,
    })
  }

  catchKafkaRetriableException(
    exception: KafkaRetriableException,
    payload: any,
  ) {
    this.loggerService.setContext('KafkaRetriableException')
    this.loggerService.error(exception.getError())

    return of({
      errorCode: 'SERVICE_ERROR',
      error: exception.getError().toString(),
      data: payload,
    })
  }

  catchUnknownException(
    exception: Record<string, unknown>,
    payload: any,
  ): Observable<IErrorResponse> {
    const error = {
      error: JSON.stringify(exception),
      errorCode: 'INTERNAL_SERVER_ERROR',
      data: payload,
    }

    this.loggerService.error('UNKNOWN_EXCEPTION \n' + JSON.stringify(error))

    return of({
      error: JSON.stringify(exception),
      errorCode: 'INTERNAL_SERVER_ERROR',
      data: payload,
    })
  }
}
