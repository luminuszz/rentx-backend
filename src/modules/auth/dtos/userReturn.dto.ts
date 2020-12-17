import { Field, ObjectType } from '@nestjs/graphql'
import { PayloadDTO } from './payload.dto'

@ObjectType()
export class userReturn {
  @Field()
  user: PayloadDTO

  @Field()
  token: string
}
