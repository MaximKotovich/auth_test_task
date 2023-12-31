import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const GetUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return user.id
  }
)
