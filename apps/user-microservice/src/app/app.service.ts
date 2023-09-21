import {PrismaService} from '@bee-project/prisma'
import {Injectable} from '@nestjs/common'
import {EventPattern} from '@nestjs/microservices'

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('get-user-by-id')
  getUserById(id: number) {
    return this.prisma.user.findUnique({where: {id}})
  }
}
