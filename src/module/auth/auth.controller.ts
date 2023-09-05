import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { AuthRequestDto } from './dto/auth-request.dto'
import { AuthResponseDto } from './dto/auth-response.dto'
import { Request } from 'express'
import { RefreshAuthGuard } from './guards/refresh-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiResponse({ type: [AuthResponseDto] })
  async login (@Body() userAuthRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.authService.login(userAuthRequestDto)
  }

  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refreshToken')
  @ApiResponse({ type: [AuthResponseDto] })
  async refreshToken (@Req() req: Request): Promise<AuthResponseDto> {
    return await this.authService.refreshToken(req)
  }
}
