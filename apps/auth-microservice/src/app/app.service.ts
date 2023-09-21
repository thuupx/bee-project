import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
  getData(data: any) {
    throw new Error('hello')
  }
}
