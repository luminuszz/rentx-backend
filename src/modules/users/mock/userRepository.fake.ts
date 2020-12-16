import { uuid } from 'uuidv4'
import { CreateUserDTO } from '../dtos/createUser.dto'
import { IUserRepository } from '../dtos/IUserRepository'
import { User, UserRole } from '../entities/user.entity'
import { Field } from '../dtos/Field'
import { EditUserDTO } from '../dtos/editUser.dto'

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

  public async deleteUser(userId: string): Promise<void> {
    const filterUsers = this.users.filter(user => user.id !== userId)

    this.users = filterUsers
  }

  public async editUser(fields: EditUserDTO): Promise<User> {
    const currentIndex = this.users.findIndex(user => user.id === fields.id)

    this.users[currentIndex] = { ...this.users[currentIndex], ...fields }

    return this.users[currentIndex]
  }
}
