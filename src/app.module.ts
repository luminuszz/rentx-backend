import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { gqlModuleConfig } from './config/modulesConfig'
import { pgConnection } from './database/connections'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConnection),
    UsersModule,
    GraphQLModule.forRoot(gqlModuleConfig),
  ],

  providers: [AppService],
})
export class AppModule {}
