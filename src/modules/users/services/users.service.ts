import { Injectable, UnauthorizedException } from '@nestjs/common'
import { HashService } from '../../../shared/providers/hash/hash.service'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { EditUserDTO } from '../dtos/editUser.dto'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find()

    return users
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findOneUser({
      column: 'email',
      value: data.email,
    })

    if (userExists) {
      throw new UnauthorizedException('User already existis')
    }

    const newUser = await this.userRepository.createUser(data)

    newUser.password = await this.hashService.createHash(newUser.password)

    return newUser
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId)
  }

  public async editUser(fields: EditUserDTO): Promise<User> {
    const editedUser = await this.userRepository.editUser(fields)

    return editedUser
  }
}
