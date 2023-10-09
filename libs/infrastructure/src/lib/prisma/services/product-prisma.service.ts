import {PrismaClient} from '.prisma/product-client'
import {Inject, Injectable, OnModuleInit, Optional} from '@nestjs/common'

import {PrismaServiceOptions} from '../interfaces'
import {PRISMA_SERVICE_OPTIONS} from '../prisma.constants'

@Injectable()
export class ProductPrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    private readonly prismaServiceOptions: PrismaServiceOptions = {},
  ) {
    super(prismaServiceOptions.prismaOptions)
  }

  async onModuleInit() {
    if (this.prismaServiceOptions.explicitConnect) {
      await this.$connect()
    }
  }
}
