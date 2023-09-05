import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({
    description: 'the unique id of user',
    required: true
  })
    id: string

  @ApiProperty({
    required: true,
    description: 'created date'
  })
    createdAt: Date

  @ApiProperty({
    required: true,
    description: 'updated date'
  })
    updatedAt: Date

  @ApiProperty({
    description: 'the unique username of account',
    required: true
  })
    username: string

  @ApiProperty({
    description: 'the pass of account',
    required: true
  })
    password: string
}
