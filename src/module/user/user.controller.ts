import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { GetUserId } from '../../common/decorators/get-user-id.decorator'
import { UserResponseDto } from './dto/get-user-response.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/info')
  @ApiResponse({ type: [UserResponseDto] })
  async info (@GetUserId() userId: string): Promise<UserResponseDto> {
    return await this.userService.findUserById(userId)
  }
}
