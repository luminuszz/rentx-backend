import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ValidUserDTO {
  @Field()
  email: string

  @Field()
  password: string
}
