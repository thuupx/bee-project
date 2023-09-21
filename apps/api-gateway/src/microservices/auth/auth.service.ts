
import { InjectAuthClient } from '@bee-project/shared';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectAuthClient()
    private readonly authClient: ClientKafka
  ) {}

  getData() {
    this.authClient.emit('get-data', 'Hi').subscribe((v) => {
      console.log('event emitted', v);
    });
  }
}
