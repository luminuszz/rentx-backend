import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PayloadDTO {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  id: string

  @Field()
  role: string
}
