import { User } from '../entities/user.entity'

export interface Field {
  column: keyof User
  value: string | Date
}
