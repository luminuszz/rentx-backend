import { UnauthorizedException } from '@nestjs/common'
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

  describe('getUsers', async () => {
    it('should be able to get all users', async () => {
      const users = UserFactory.getManyUser(5)

      users.forEach(async user => {
        await service.createUser(user)
      })

      const currenUsers = await service.getAllUsers()

      expect(currenUsers).toHaveLength(5)
    })
  })
})
