import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { Field } from '../dtos/Field'
import { IUserRepository } from '../dtos/IUserRepository'
import { User } from '../entities/user.entity'

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository {
  public async createUser(data: CreateUserDTO): Promise<User> {
    const newUser = this.create(data)

    await this.save(newUser)

    return newUser
  }

  public async findOneUser({
    column,
    value,
  }: Field): Promise<User | undefined> {
    const user = await this.findOne({ where: { [column]: value } })

    return user
  }
}
