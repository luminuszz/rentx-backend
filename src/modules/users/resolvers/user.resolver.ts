import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/users.service'

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  public async getAllUsers(): Promise<User[]> {
    const users = await this.userService.getAllUsers()
    return users
  }

  @Mutation(() => User)
  public async createUser(
    @Args('inputUser') data: CreateUserDTO
  ): Promise<User> {
    const newUser = await this.userService.createUser(data)

    return newUser
  }
}
