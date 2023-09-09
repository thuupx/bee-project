import { Inject } from '@nestjs/common';

import { ClientToken } from '../constants';

export const InjectUserClient = () => Inject(ClientToken.UserMicroservice);
export const InjectAuthClient = () => Inject(ClientToken.AuthMicroservice);
export const InjectApiGatewayClient = () => Inject(ClientToken.ApiGateway);
