import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.repository'
import { UserResolver } from './resolvers/user.resolver'
import { UsersService } from './services/users.service'
import { HashModuleProvider } from '../../shared/providers/hash/hash.module'
import { APP_GUARD } from '@nestjs/core'
import { RoleGuard } from '../auth/guards/roleGuard.guard'
import { GqlAuthGuard } from '../auth/guards/gqlAuth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), HashModuleProvider],
  providers: [
    { provide: APP_GUARD, useClass: GqlAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    UsersService,
    UserResolver,
  ],
  exports: [UsersService],
})
export class UsersModule {}
