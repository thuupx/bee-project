import {
  ArchiveProductRequest,
  CreateProductRequest,
  GetProductRequest,
  GetProductsRequest,
  GetProductsResponse,
  Product,
  ProductServiceController,
  ProductServiceControllerMethods,
  UpdateProductRequest,
} from '@bee-project/infrastructure'
import {Metadata} from '@grpc/grpc-js'
import {Controller} from '@nestjs/common'
import {Observable} from 'rxjs'

import {AppService} from './app.service'

@Controller('product')
@ProductServiceControllerMethods()
export class AppController implements ProductServiceController {
  constructor(private readonly appService: AppService) {}
  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Product | Promise<Product> | Observable<Product> {
    return this.appService.getProduct(request, metadata)
  }

  getProducts(
    request: GetProductsRequest,
    metadata?: Metadata,
  ):
    | GetProductsResponse
    | Promise<GetProductsResponse>
    | Observable<GetProductsResponse> {
    return this.appService.getProducts(request, metadata)
  }

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ): Product | Promise<Product> | Observable<Product> {
    return this.appService.createProduct(request, metadata)
  }

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Product | Promise<Product> | Observable<Product> {
    return this.appService.updateProduct(request, metadata)
  }

  archiveProduct(
    request: ArchiveProductRequest,
    metadata?: Metadata,
  ): Product | Promise<Product> | Observable<Product> {
    return this.appService.archiveProduct(request, metadata)
  }
}
