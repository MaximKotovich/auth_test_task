import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
  @ApiProperty({
    description: 'generated access token for user',
    required: true
  })
    accessToken: string

  @ApiProperty({
    description: 'generated refresh token for user',
    required: true
  })
    refreshToken: string
}
