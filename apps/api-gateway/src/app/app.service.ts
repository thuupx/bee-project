import { InjectApiGatewayClient } from '@bee-project/common';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectApiGatewayClient()
    private readonly client: ClientKafka
  ) {}
  getData() {
    return this.client.send('auth', 'hello');
  }
}
