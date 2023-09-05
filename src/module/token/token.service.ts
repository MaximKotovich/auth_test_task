import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { type UserModel } from '../../models/user.model'
import { type InterfaceGetTokensResponse } from './interfaces/get-tokens.response'

@Injectable()
export class TokenService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async generateJwtAccessToken (user: UserModel): Promise<string> {
    const accessTokenPayload = { id: user.id, username: user.username, password: user.password }
    return this.jwtService.sign(accessTokenPayload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES')
    })
  }

  async generateJwtRefreshToken (user: UserModel): Promise<string> {
    const accessTokenPayload = { id: user.id }
    return this.jwtService.sign(accessTokenPayload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES')
    })
  }

  async getTokens (user: UserModel): Promise<InterfaceGetTokensResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateJwtAccessToken(user),
      this.generateJwtRefreshToken(user)
    ])
    return {
      accessToken,
      refreshToken
    }
  }
}
