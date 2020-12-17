import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Request as ExpressRequest } from 'express'
import { Observable } from 'rxjs'
import { decoratorKey, AuthType } from '../decorators/auth.decorator'

type canActiveReturn = boolean | Promise<boolean> | Observable<boolean>

export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  public getRequest(context: ExecutionContext): ExpressRequest {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext<{ req: ExpressRequest }>().req
  }

  public canActive(context: GqlExecutionContext): canActiveReturn {
    const authType = this.reflector.get<string>(
      decoratorKey,
      context.getHandler()
    )

    if (!AuthType[authType]) {
      return true
    }

    return super.canActivate(context)
  }
}
