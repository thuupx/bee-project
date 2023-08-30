import { PrismaService } from '@bee-project/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
