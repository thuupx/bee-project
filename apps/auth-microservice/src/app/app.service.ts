import { InjectAuthClient } from '@bee-project/common';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectAuthClient()
    private readonly client: ClientKafka
  ) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
