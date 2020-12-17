import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { gqlModuleConfig } from './config/modulesConfig'
import { pgConnection } from './database/connections'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { ClassValidatorPipe } from './shared/pipes/classValidator.pipe'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConnection),
    UsersModule,
    GraphQLModule.forRoot(gqlModuleConfig),
    AuthModule,
  ],

  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ClassValidatorPipe },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
