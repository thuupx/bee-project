import {Inject} from '@nestjs/common'

import {ServiceName} from '../enums'

export const InjectAccountClient = () => Inject(ServiceName.Account)
export const InjectProductClient = () => Inject(ServiceName.Product)
