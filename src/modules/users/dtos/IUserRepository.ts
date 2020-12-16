import { User } from '../entities/user.entity'
import { CreateUserDTO } from './createUser.dto'

export abstract class IUserRepository {
  public abstract createUser(data: CreateUserDTO): Promise<User>
}
