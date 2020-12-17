import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserRole } from '../../users/entities/user.entity'
import { UsersService } from '../../users/services/users.service'
import { ROLE_KEY_TOKEN } from '../decorators/role.decorator'
import { PayloadDTO } from '../dtos/payload.dto'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService
  ) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(ctx)

    const currentRole = this.reflector.get<string>(
      ROLE_KEY_TOKEN,
      gqlCtx.getHandler()
    )

    const { user } = gqlCtx.getContext<{ req: { user: PayloadDTO } }>().req

    const checkUserPermission = await this.usersService.findOneUser(
      'id',
      user.id
    )
    if (checkUserPermission.role !== UserRole[currentRole]) {
      throw new UnauthorizedException('user not authorized')
    }

    return true
  }
}
