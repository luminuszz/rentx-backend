import { User } from '../entities/user.entity'
import { CreateUserDTO } from './createUser.dto'
import { EditUserDTO } from './editUser.dto'
import { Field } from './Field'

export abstract class IUserRepository {
  public abstract createUser(data: CreateUserDTO): Promise<User>

  public abstract find(): Promise<User[]>

  public abstract findOneUser(args: Field): Promise<User | undefined>

  public abstract deleteUser(userId: string): Promise<void>

  public abstract editUser(fields: EditUserDTO): Promise<User>
}
