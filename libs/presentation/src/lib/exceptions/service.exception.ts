import {RpcException} from '@nestjs/microservices'

import {IErrorResponse} from '../interfaces/error-response.interface'

export class ServiceException extends RpcException {
  body: IErrorResponse

  constructor(body: IErrorResponse = {errorCode: 'UNKNOWN'}) {
    super(body)

    this.body = body
  }

  getResponse() {
    return this.body
  }
}
