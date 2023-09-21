import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
  getData(data: any) {
    return {message: 'Hello API'}
  }
}
