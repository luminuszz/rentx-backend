import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { EditUserDTO } from '../dtos/editUser.dto'
import { Field } from '../dtos/Field'
import { IUserRepository } from '../dtos/IUserRepository'
import { User } from '../entities/user.entity'

@Injectable()
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

  public async deleteUser(userId: string): Promise<void> {
    await this.delete(userId)
  }

  public async editUser(fields: EditUserDTO): Promise<User> {
    const { id, ...values } = fields

    const user = await this.findOneUser({ column: 'id', value: id })

    const editedUser = this.create({ ...user, ...values })

    await this.save(editedUser)

    return editedUser
  }
}
