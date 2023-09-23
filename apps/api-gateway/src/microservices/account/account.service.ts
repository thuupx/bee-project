import {InjectAccountClient} from '@bee-project/infrastructure'
import {Injectable, OnModuleInit} from '@nestjs/common'
import {ClientKafka} from '@nestjs/microservices'

@Injectable()
export class AccountService implements OnModuleInit {
  constructor(
    @InjectAccountClient()
    private readonly accountClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.accountClient.connect()
  }

  getData() {
    this.accountClient.emit('get-data', 'Hi').subscribe((v) => {
      console.log('event emitted', v)
    })
  }
}
