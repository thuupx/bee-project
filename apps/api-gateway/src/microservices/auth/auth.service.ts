import {InjectAuthClient} from '@bee-project/shared'
import {Injectable, OnModuleInit} from '@nestjs/common'
import {ClientKafka} from '@nestjs/microservices'

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectAuthClient()
    private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.authClient.connect()
  }

  getData() {
    this.authClient.emit('get-data', 'Hi').subscribe((v) => {
      console.log('event emitted', v)
    })
  }
}
