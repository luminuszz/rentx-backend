import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { HashModuleProvider } from '../../../shared/providers/hash/hash.module'
import { FakeUserRepository } from '../mock/userRepository.fake'
import { UserRepository } from '../repositories/user.repository'
import { UsersService } from './users.service'

import { UserFactory } from '../../../shared/utils/factories'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashModuleProvider],
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useClass: FakeUserRepository,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  describe('createUser', () => {
    it(' should be able to create a new user', async () => {
      const user = UserFactory.getUserRequest()

      const savedUser = await service.createUser(user)

      expect(savedUser).toHaveProperty('id')
    })

    it('not should be able create user with same email', async () => {
      const user1 = UserFactory.getUserRequest()
      const user2 = {
        ...user1,
        name: 'teste ',
      }

      await service.createUser(user1)

      await expect(service.createUser(user2)).rejects.toBeInstanceOf(
        UnauthorizedException
      )
    })
  })

  describe('getUsers', () => {
    it('should be able to get all users', async () => {
      const users = UserFactory.getManyUser(2)

      await service.createUser(users[0])
      await service.createUser(users[1])

      const currentUsers = await service.getAllUsers()

      console.log(currentUsers)

      expect(currentUsers).toHaveLength(2)
    })
  })

  describe('deleteUser', () => {
    it('should be able to delete user', async () => {
      const newUser = UserFactory.getUserRequest()

      const user = await service.createUser(newUser)

      await service.deleteUser(user.id)

      const allUsers = await service.getAllUsers()

      expect(allUsers).not.toContain(user)
    })
  })

  describe('editUser', () => {
    it('should ble able to edit user', async () => {
      const newUser = UserFactory.getUserRequest()

      const { id } = await service.createUser(newUser)

      const editedUser = await service.editUser({
        password: newUser.password,
        id,
        name: 'cavalo',
      })

      expect(editedUser.name).toEqual('cavalo')
    })

    it('should not be able to edit user if currentUser not exists', async () => {
      const newUser = UserFactory.getUserRequest()

      const savedUser = await service.createUser(newUser)

      const { password } = savedUser

      await expect(
        service.editUser({ password, id: 'id inválido', name: 'editado' })
      ).rejects.toBeInstanceOf(BadRequestException)
    })

    it('should not be able to edit user if current password does not match', async () => {
      const newUser = UserFactory.getUserRequest()

      const savedUser = await service.createUser(newUser)

      console.log(savedUser.password)

      await expect(
        service.editUser({
          password: 'password invalid',
          id: savedUser.id,
          name: 'editado',
        })
      ).rejects.toBeInstanceOf(UnauthorizedException)
    })
  })
})
