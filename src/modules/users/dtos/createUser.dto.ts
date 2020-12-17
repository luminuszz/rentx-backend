import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType('createUser')
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string
}
