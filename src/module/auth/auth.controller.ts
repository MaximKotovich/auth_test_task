import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { AuthRequestDto } from './dto/auth-request.dto'
import { AuthResponseDto } from './dto/auth-response.dto'
import { RefreshTokenDTO } from './dto/refresh-token-request.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiResponse({ type: AuthResponseDto })
  async login (@Body() userAuthRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.authService.login(userAuthRequestDto)
  }

  @Post('refreshToken')
  @ApiResponse({ type: AuthResponseDto })
  async refreshToken (@Body() req: RefreshTokenDTO): Promise<AuthResponseDto> {
    return await this.authService.refreshToken(req.refreshToken)
  }
}
