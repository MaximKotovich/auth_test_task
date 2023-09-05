import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TYPEORM_CONFIG_FACTORY } from './configs/type-orm.config'
import { models } from './models/models'
import { AuthModule } from './module/auth/auth.module'
import { UserModule } from './module/user/user.module'
import { TokenModule } from './module/token/token.module'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(TYPEORM_CONFIG_FACTORY(models)),
    UserModule,
    AuthModule,
    TokenModule
  ]
})
export class AppModule {}
