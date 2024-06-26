import {InjectionToken, ModuleMetadata} from '@nestjs/common'
import {Prisma as PrismaProduct} from '.prisma/product-client'
import {Prisma as PrismaAccount} from '.prisma/account-client'

export interface PrismaModuleOptions {
  /**
   * If "true", registers `PrismaModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean

  prismaServiceOptions?: PrismaServiceOptions
}

export interface PrismaServiceOptions {
  /**
   * Pass options directly to the `PrismaClient`.
   * See: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#prismaclient
   */
  prismaOptions?:
    | PrismaAccount.PrismaClientOptions
    | PrismaProduct.PrismaClientOptions

  /**
   * If "true", `PrismaClient` explicitly creates a connection pool and your first query will respond instantly.
   *
   * For most use cases the lazy connect behavior of `PrismaClient` will do. The first query of `PrismaClient` creates the connection pool.
   * See: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
   */
  explicitConnect?: boolean
}

export interface PrismaOptionsFactory {
  createPrismaOptions(): Promise<PrismaServiceOptions> | PrismaServiceOptions
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean
  useExisting?: InjectionToken<PrismaOptionsFactory>
  useClass?: InjectionToken<PrismaOptionsFactory>
  useFactory?: (
    ...args: unknown[]
  ) => Promise<PrismaServiceOptions> | PrismaServiceOptions
  inject?: InjectionToken[]
}
