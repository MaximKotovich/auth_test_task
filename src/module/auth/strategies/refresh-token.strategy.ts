import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { ForbiddenException, Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor (
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET')
    })
  }

  async validate (req: any, payload: any): Promise<any> {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim()

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token is empty')
    }

    return {
      ...payload,
      refreshToken
    }
  }
}
