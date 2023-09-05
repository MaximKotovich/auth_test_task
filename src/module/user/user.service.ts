import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { type UserModel } from '../../models/user.model'
import { type UpdateResult } from 'typeorm'

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async findByUserName (username: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { username } })
  }

  async findUserById (id: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async update (userId: string, data: Partial<Omit<UserModel, 'id' | 'ctreatedAt' | 'updatedAt'>>): Promise<UpdateResult> {
    return await this.userRepository.update({ id: userId }, data)
  }
}
