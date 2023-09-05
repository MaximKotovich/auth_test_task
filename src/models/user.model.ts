import { Column, Entity } from 'typeorm'
import { BaseModel } from './base.model'

@Entity('users')
export class UserModel extends BaseModel {
  @Column({
    type: 'varchar',
    unique: true
  })
    username: string

  @Column({
    type: 'varchar'
  })
    password: string

  @Column({
    type: 'varchar',
    nullable: true
  })
    refreshToken: string
}
