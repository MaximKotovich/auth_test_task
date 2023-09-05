import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AuthRequestDto {
  @ApiProperty({
    description: 'the unique username of account',
    required: true
  })
  @IsString()
    username: string

  @ApiProperty({
    description: 'the pass of account',
    required: true
  })
  @IsString()
    password: string
}
