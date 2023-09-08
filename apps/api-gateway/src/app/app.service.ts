import { ConfigService } from '@bee-project/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
