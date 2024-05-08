import {Product} from '@bee-project/domain'
import {
  ACCOUNT_SERVICE_NAME,
  AccountServiceClient,
  ArchiveProductRequest,
  CreateProductRequest,
  GetProductRequest,
  GetProductsRequest,
  GetProductsResponse,
  InjectAccountClient,
  ProductPrismaService,
  UpdateProductRequest,
} from '@bee-project/infrastructure'
import {Metadata} from '@grpc/grpc-js'
import {Injectable, OnModuleInit} from '@nestjs/common'
import {ClientGrpc} from '@nestjs/microservices'

@Injectable()
export class AppService implements OnModuleInit {
  private accountService: AccountServiceClient
  constructor(
    private readonly productPrismaService: ProductPrismaService,
    @InjectAccountClient() private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.accountService =
      this.client.getService<AccountServiceClient>(ACCOUNT_SERVICE_NAME)
  }

  getProduct(
    request: GetProductRequest,
    _metadata?: Metadata,
  ): Promise<Product> {
    return this.productPrismaService.product.findUnique({
      where: {
        slug: request.slug,
      },
    })
  }

  async getProducts(
    request: GetProductsRequest,
    _metadata?: Metadata,
  ): Promise<GetProductsResponse> {
    const products = await this.productPrismaService.product.findMany({
      where: {
        name: {
          contains: request.query,
        },
      },
      cursor: {
        slug: request.nextPageToken,
      },
      orderBy: {
        slug: 'asc',
      },
      take: request.limit,
    })

    return {
      limit: request.limit,
      nextPageToken: products[products.length - 1]?.slug,
      products,
      total: products.length,
    }
  }

  createProduct(
    request: CreateProductRequest,
    _metadata?: Metadata,
  ): Promise<Product> {
    return this.productPrismaService.product.create({
      data: request.product,
    })
  }

  updateProduct(
    request: UpdateProductRequest,
    _metadata?: Metadata,
  ): Promise<Product> {
    return this.productPrismaService.product.update({
      where: {
        id: request.product.id,
      },
      data: request.product,
    })
  }

  archiveProduct(
    request: ArchiveProductRequest,
    _metadata?: Metadata,
  ): Promise<Product> {
    return this.productPrismaService.product.update({
      where: {
        id: request.productId,
      },
      data: {
        isArchived: true,
      },
    })
  }
}
