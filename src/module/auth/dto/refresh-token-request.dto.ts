import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshTokenDTO {
  @ApiProperty({
    description: 'refresh token',
    required: true
  })
  @IsString()
    refreshToken: string
}
