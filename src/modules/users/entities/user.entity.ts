import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../../shared/utils/baseEntity'
import { Field, ObjectType } from '@nestjs/graphql'

export enum UserRole {
  user = 'user',
  admin = 'admin',
}

@Entity('users')
@ObjectType('user', { description: 'This a userReturn query' })
export class User extends BaseEntity {
  @Column('varchar', { nullable: false })
  @Field({ nullable: false })
  name: string

  @Column('varchar', { nullable: true })
  @Field({ nullable: true })
  image: string

  @Column('varchar', { nullable: false })
  @Field({ nullable: false })
  email: string

  @Column('varchar', { nullable: false })
  @Field({ nullable: false })
  password: string

  @Column({ enum: UserRole, default: UserRole.user })
  @Field({ nullable: false })
  role: UserRole
}
