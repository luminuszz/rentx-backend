import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/modules/users/entities/user.entity'
import { UsersService } from '../../users/services/users.service'
import { HashService } from '../../../shared/providers/hash/hash.service'
import { PayloadDTO } from '../dtos/payload.dto'
import { userReturn } from '../dtos/userReturn.dto'
import { ValidUserDTO } from '../dtos/validUser.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser({ email, password }: ValidUserDTO): Promise<User> {
    const foundedUser = await this.userService.findOneUser('email', email)

    if (!foundedUser) {
      return null
    }

    const validPassword = await this.hashService.validateHash(
      password,
      foundedUser.password
    )

    if (!validPassword) {
      return null
    }

    return foundedUser
  }

  public async createToken(payload: PayloadDTO): Promise<{ token: string }> {
    const token = await this.jwtService.signAsync(payload)

    return {
      token,
    }
  }

  public async login({ email, password }: ValidUserDTO): Promise<userReturn> {
    const validateUser = await this.validateUser({ email, password })

    if (!validateUser) {
      throw new UnauthorizedException('credentials incorrect')
    }
    const { email: validUserEmail, id, name, role } = validateUser

    const { token } = await this.createToken({
      email: validUserEmail,
      id,
      name,
      role,
    })

    return {
      token,
      user: {
        email,
        id,
        role,
        name,
      },
    }
  }
}
