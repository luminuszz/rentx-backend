import { uuid } from 'uuidv4'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { IUserRepository } from '../dtos/IUserRepository'
import { User, UserRole } from '../entities/user.entity'
import { Field } from '../dtos/Field'

export class FakeUserRepository implements IUserRepository {
  private users: User[] = []

  constructor() {
    this.users = []
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    const newUser = new User()

    Object.assign(newUser, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uuid(),
      role: UserRole.user,
    })
    this.users.push(newUser)

    return newUser
  }

  public async findOneUser({
    column,
    value,
  }: Field): Promise<User | undefined> {
    const currentUser = this.users.find(user => user[column] === value)

    return currentUser
  }

  public async find(): Promise<User[]> {
    return this.users
  }
}
