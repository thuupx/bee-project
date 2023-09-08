import { ClientToken } from '@bee-project/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject(ClientToken.AuthMicroservice)
    private readonly client: ClientKafka) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
