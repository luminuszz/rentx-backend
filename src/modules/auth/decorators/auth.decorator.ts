import { CustomDecorator, SetMetadata } from '@nestjs/common'

export enum AuthType {
  jwt = 'jwt',
}

export const decoratorKey = 'auth'

export const Auth = (authType: keyof typeof AuthType): CustomDecorator =>
  SetMetadata(decoratorKey, authType)
