import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class EditUserDTO {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field()
  id: string

  @Field()
  password: string
}
