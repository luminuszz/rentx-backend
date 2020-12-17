import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../users/services/users.service'
import { AuthService } from './auth.service'
import { jwtConfig } from '../../../config/jtw.config'
import { HashModuleProvider } from '../../../shared/providers/hash/hash.module'
import { UserFactory } from '../../../shared/utils/factories'
import { FakeUserRepository } from '../../users/mock/userRepository.fake'
import { UserRepository } from '../../users/repositories/user.repository'

describe('authService', () => {
  let authService: AuthService
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        HashModuleProvider,
        JwtModule.register({
          secret: jwtConfig.secret,
          signOptions: { expiresIn: jwtConfig.expire },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        { provide: UserRepository, useClass: FakeUserRepository },
      ],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    usersService = moduleRef.get<UsersService>(UsersService)
  })

  describe('validUser met', () => {
    it('should be able to validUser', async () => {
      const newUser = UserFactory.getUserRequest()

      const user = await usersService.createUser({
        ...newUser,
        password: '123456',
      })

      const response = await authService.validateUser({
        email: user.email,
        password: '123456',
      })

      expect(response).toHaveProperty('id')
    })

    it('should not be able validUser with email is wrong', async () => {
      const newUser = UserFactory.getUserRequest()

      const user = await usersService.createUser({
        ...newUser,
        password: '123456',
      })

      const response = await authService.validateUser({
        email: 'email errado',
        password: '123456',
      })

      expect(response).toBe(null)
    })

    it('should not be able validUser with password is wrong', async () => {
      const newUser = UserFactory.getUserRequest()

      const user = await usersService.createUser({
        ...newUser,
        password: '123456',
      })

      const response = await authService.validateUser({
        email: user.email,
        password: 'senha errada',
      })

      expect(response).toBe(null)
    })
  })

  describe('createToken', () => {
    it('should able to create token', async () => {
      const newUser = UserFactory.getUserRequest()

      const user = await usersService.createUser({
        ...newUser,
        password: '123456',
      })

      const { email, id, name, role } = await authService.validateUser({
        email: user.email,
        password: '123456',
      })

      const { token } = await authService.createToken({ email, id, name, role })

      expect(typeof token).toBe('string')
    })
  })
})
