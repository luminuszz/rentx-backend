import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date
}
