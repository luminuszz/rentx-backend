import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { AuthResolver } from './resolvers/auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '../../config/jtw.config'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { HashModuleProvider } from '../../shared/providers/hash/hash.module'

@Module({
  imports: [
    UsersModule,
    HashModuleProvider,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expire },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
