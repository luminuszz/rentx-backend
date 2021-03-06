import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { EditUserDTO } from '../dtos/editUser.dto'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/users.service'
import { AuthType } from '../../auth/decorators/authType.decorator'

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @AuthType('jwt', 'admin')
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

  @Mutation(() => Boolean)
  public async deleteUser(@Args('userId') userId: string): Promise<boolean> {
    await this.userService.deleteUser(userId)

    return true
  }

  @Mutation(() => User)
  public async editUser(@Args('editUser') fields: EditUserDTO): Promise<User> {
    const editedUser = await this.userService.editUser(fields)

    return editedUser
  }
}
