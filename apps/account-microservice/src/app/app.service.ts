import {
  AccountPrismaService,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '@bee-project/infrastructure'
import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private readonly accountPrismaService: AccountPrismaService) {}

  async login({email, password}: LoginRequest): Promise<LoginResponse> {
    const user = await this.accountPrismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const token = 'token'

    return {token}
  }

  async signUp({
    email,
    password,
    name,
  }: SignUpRequest): Promise<SignUpResponse> {
    const user = await this.accountPrismaService.user.create({
      data: {
        email,
        name,
      },
    })

    const token = Buffer.from(user.email + ':' + password).toString('base64')

    return {token}
  }
}
