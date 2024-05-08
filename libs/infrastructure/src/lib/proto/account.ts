/* eslint-disable */
import {Metadata} from '@grpc/grpc-js'
import {GrpcMethod, GrpcStreamMethod} from '@nestjs/microservices'
import {Observable} from 'rxjs'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export interface SignUpResponse {
  token: string
}

export interface AccountServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>

  signUp(
    request: SignUpRequest,
    metadata?: Metadata,
  ): Observable<SignUpResponse>
}

export interface AccountServiceController {
  login(
    request: LoginRequest,
    metadata?: Metadata,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse

  signUp(
    request: SignUpRequest,
    metadata?: Metadata,
  ): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse
}

export function AccountServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['login', 'signUp']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      )
      GrpcMethod('AccountService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      )
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      )
      GrpcStreamMethod('AccountService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      )
    }
  }
}

export const ACCOUNT_SERVICE_NAME = 'AccountService'
