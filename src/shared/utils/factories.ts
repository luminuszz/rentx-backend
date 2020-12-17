import { name, internet, random } from 'faker'
import { CreateUserDTO } from 'src/modules/users/dtos/createUser.dto'

export enum FactoryKey {
  user = 'user',
  adminUser = 'admin',
}

export class UserFactory {
  public static getUserRequest(): CreateUserDTO {
    return {
      email: internet.email(),
      name: name.firstName(),
      password: random.words(),
    }
  }

  public static getManyUser(quantity: number): CreateUserDTO[] {
    const users: CreateUserDTO[] = []

    for (let l = 0; l < quantity; l++) {
      users.push({
        email: internet.email(),
        name: name.firstName(),
        password: random.alphaNumeric(),
      })
    }

    return users
  }
}
