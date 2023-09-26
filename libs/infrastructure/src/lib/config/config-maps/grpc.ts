import {registerAs} from '@nestjs/config'

export default registerAs('grpc', () => {
  return {
    productUrl: process.env.GRPC_PRODUCT_URL,
    accountUrl: process.env.GRPC_ACCOUNT_URL,
  }
})
