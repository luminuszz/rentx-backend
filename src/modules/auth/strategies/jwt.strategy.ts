import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/modules/users/services/users.service'
import { jwtConfig } from '../../../config/jtw.config'
import { PayloadDTO } from '../dtos/payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  public async validate(payload: PayloadDTO): Promise<PayloadDTO> {
    const checkUser = await this.usersService.findOneUser('id', payload.id)

    if (!checkUser) {
      throw new UnauthorizedException('Not authorized')
    }

    return payload
  }
}
