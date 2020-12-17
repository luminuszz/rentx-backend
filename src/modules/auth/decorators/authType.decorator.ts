import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { UserRole } from '../../users/entities/user.entity'
import { GqlAuthGuard } from '../guards/gqlAuth.guard'
import { RoleGuard } from '../guards/roleGuard.guard'
import { AuthType as AuthTypeKey, decoratorKey } from './auth.decorator'
import { ROLE_KEY_TOKEN } from './role.decorator'

export const AuthType = (
  authType?: keyof typeof AuthTypeKey,
  role?: keyof typeof UserRole
): any =>
  applyDecorators(
    SetMetadata(decoratorKey, authType),
    UseGuards(GqlAuthGuard),
    SetMetadata(ROLE_KEY_TOKEN, role),
    UseGuards(RoleGuard)
  )
