import {
  AccountServiceController,
  AccountServiceControllerMethods,
  LoginRequest,
  LoginResponse,
} from '@bee-project/infrastructure'
import {Controller, Get} from '@nestjs/common'
import {Observable} from 'rxjs'

import {AppService} from './app.service'

@Controller('account')
@AccountServiceControllerMethods()
export class AppController implements AccountServiceController {
  constructor(private readonly appService: AppService) {}

  login(
    request: LoginRequest,
  ): LoginResponse | Promise<LoginResponse> | Observable<LoginResponse> {
    throw new Error('Method not implemented.')
  }

  @Get()
  getData() {
    return this.appService.getData()
  }
}
