import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class EditUserDTO {
  @IsString()
  @Field({ nullable: true })
  name?: string

  @IsEmail()
  @Field({ nullable: true })
  email?: string

  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string
}
