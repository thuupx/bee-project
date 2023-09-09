import { InjectUserClient } from '@bee-project/common';
import { PrismaService } from '@bee-project/prisma';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectUserClient()
    private readonly client: ClientKafka
  ) {}

  getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
