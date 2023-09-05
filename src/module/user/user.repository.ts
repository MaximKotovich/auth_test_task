import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { UserModel } from '../../models/user.model'

@Injectable()
export class UserRepository extends Repository<UserModel> {
  constructor (private readonly dataSource: DataSource) {
    super(UserModel, dataSource.createEntityManager())
  }
}
