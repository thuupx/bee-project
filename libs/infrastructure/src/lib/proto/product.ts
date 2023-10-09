/* eslint-disable */
import {Metadata} from '@grpc/grpc-js'
import {GrpcMethod, GrpcStreamMethod} from '@nestjs/microservices'
import {Observable} from 'rxjs'

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  isPublic: boolean
  isArchived: boolean
}

export interface GetProductRequest {
  slug: string
}

export interface GetProductsRequest {
  limit: number
  nextPageToken: string
  query?: string | undefined
}

export interface GetProductsResponse {
  products: Product[]
  total: number
  limit: number
  nextPageToken: string
}

export interface CreateProductRequest {
  product: Product | undefined
}

export interface UpdateProductRequest {
  product: Product | undefined
}

export interface ArchiveProductRequest {
  productId: number
}

export interface ProductServiceClient {
  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Observable<Product>

  getProducts(
    request: GetProductsRequest,
    metadata?: Metadata,
  ): Observable<GetProductsResponse>

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ): Observable<Product>

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Observable<Product>

  archiveProduct(
    request: ArchiveProductRequest,
    metadata?: Metadata,
  ): Observable<Product>
}

export interface ProductServiceController {
  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Promise<Product> | Observable<Product> | Product

  getProducts(
    request: GetProductsRequest,
    metadata?: Metadata,
  ):
    | Promise<GetProductsResponse>
    | Observable<GetProductsResponse>
    | GetProductsResponse

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ): Promise<Product> | Observable<Product> | Product

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Promise<Product> | Observable<Product> | Product

  archiveProduct(
    request: ArchiveProductRequest,
    metadata?: Metadata,
  ): Promise<Product> | Observable<Product> | Product
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getProduct',
      'getProducts',
      'createProduct',
      'updateProduct',
      'archiveProduct',
    ]
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
