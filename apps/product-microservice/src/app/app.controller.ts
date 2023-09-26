import {
  GetProductQuery,
  Product,
  ProductServiceController,
  ProductServiceControllerMethods,
} from '@bee-project/infrastructure'
import {Controller, Get} from '@nestjs/common'
import {Observable} from 'rxjs'

import {AppService} from './app.service'

@Controller('product')
@ProductServiceControllerMethods()
export class AppController implements ProductServiceController {
  constructor(private readonly appService: AppService) {}
  getProduct(
    request: GetProductQuery,
  ): Product | Promise<Product> | Observable<Product> {
    throw new Error('Method not implemented.')
  }

  @Get()
  getData() {
    return this.appService.getData()
  }
}
