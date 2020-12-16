import { Field, InputType } from '@nestjs/graphql'

@InputType('createUser')
export class CreateUserDTO {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}
