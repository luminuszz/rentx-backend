import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { userReturn } from '../dtos/userReturn.dto'
import { ValidUserDTO } from '../dtos/validUser.dto'
import { AuthService } from '../services/auth.service'
@Resolver('Login')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => userReturn)
  public async login(
    @Args('credentials') values: ValidUserDTO
  ): Promise<userReturn> {
    const response = await this.authService.login(values)

    return response
  }
}
