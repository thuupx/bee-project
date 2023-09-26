import {Inject} from '@nestjs/common'

import {ClientToken} from '../enums'

export const InjectAccountClient = () => Inject(ClientToken.AccountMicroservice)
export const InjectProductClient = () => Inject(ClientToken.ProductMicroservice)
