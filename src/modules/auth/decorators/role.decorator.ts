import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/modules/users/entities/user.entity'

export const ROLE_KEY_TOKEN = 'role'

export const Role = (role: keyof typeof UserRole): CustomDecorator =>
  SetMetadata(ROLE_KEY_TOKEN, role)
