/* eslint-disable */
import {Metadata} from '@grpc/grpc-js'
import {GrpcMethod, GrpcStreamMethod} from '@nestjs/microservices'
import {Observable} from 'rxjs'

export interface GetProductQuery {
  id: number
  slug: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
}

export interface ProductServiceClient {
  getProduct(request: GetProductQuery, metadata?: Metadata): Observable<Product>
}

export interface ProductServiceController {
  getProduct(
    request: GetProductQuery,
    metadata?: Metadata,
  ): Promise<Product> | Observable<Product> | Product
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getProduct']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      )
      GrpcMethod('ProductService', method)(
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
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      )
    }
  }
}

export const PRODUCT_SERVICE_NAME = 'ProductService'
