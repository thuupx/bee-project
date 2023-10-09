import {registerAs} from '@nestjs/config'

export default registerAs('prisma', () => {
  return {
    productDbUrl: process.env.PRODUCT_DATABASE_URL,
    accountDbUrl: process.env.ACCOUNT_DATABASE_URL,
  }
})
