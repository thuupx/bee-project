import {
  AccountServiceController,
  AccountServiceControllerMethods,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '@bee-project/infrastructure'
import {Metadata} from '@grpc/grpc-js'
import {Controller} from '@nestjs/common'
import {Observable} from 'rxjs'

import {AppService} from './app.service'

@Controller('account')
@AccountServiceControllerMethods()
export class AppController implements AccountServiceController {
  constructor(private readonly appService: AppService) {}

  login(
    request: LoginRequest,
  ): LoginResponse | Promise<LoginResponse> | Observable<LoginResponse> {
    console.log(request)

    return this.appService.login(request)
  }

  signUp(
    request: SignUpRequest,
    metadata?: Metadata,
  ): SignUpResponse | Promise<SignUpResponse> | Observable<SignUpResponse> {
    return this.appService.signUp(request)
  }
}
