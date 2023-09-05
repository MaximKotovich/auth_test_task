import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type AuthResponseDto } from './dto/auth-response.dto'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service'
import { type Request } from 'express'
import { type AuthRequestDto } from './dto/auth-request.dto'

@Injectable()
export class AuthService {
  constructor (
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async login (userAuthRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    const existUser = await this.userService.findByUserName(userAuthRequestDto.username)
    if (!existUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: `not found user with username - ${userAuthRequestDto.username}`
      }, HttpStatus.FORBIDDEN)
    }

    const validatePass: boolean = await bcrypt.compare(userAuthRequestDto.password, existUser.password)
    if (!validatePass) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'incorrect login or password'
      }, HttpStatus.FORBIDDEN)
    }

    const tokens = await this.tokenService.getTokens(existUser)

    await this.updateRefreshTokenToDB(existUser.id, tokens.refreshToken)

    return tokens
  }

  async refreshToken (req: Request): Promise<AuthResponseDto> {
    const userId = req.user.id
    const refreshToken = req.user.refreshToken
    const existUser = await this.userService.findUserById(userId)

    if (!existUser?.refreshToken) {
      throw new ForbiddenException('Access Denied')
    }

    const refreshTokensMatches: boolean = await bcrypt.compare(refreshToken, existUser.refreshToken)

    if (!refreshTokensMatches) {
      throw new ForbiddenException('Access Denied')
    }

    const accessToken = await this.tokenService.generateJwtAccessToken(existUser)

    return {
      accessToken,
      refreshToken
    }
  }

  async updateRefreshTokenToDB (userId: string, token: string): Promise<void> {
    const hashedToken = await bcrypt.hash(token, 12)
    await this.userService.update(userId, { refreshToken: hashedToken })
  }
}
