import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.repository'
import { UserResolver } from './resolvers/user.resolver'
import { UsersService } from './services/users.service'
import { HashModuleProvider } from 'src/shared/providers/hash/hash.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), HashModuleProvider],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
