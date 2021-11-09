import { ok, serverError, unauthorized } from '@shared/presentation/helpers/http'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Middleware } from '@shared/presentation/protocols/middleware'

import { ValidateToken } from '../use-cases/contracts/validate-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly validateToken: ValidateToken
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      if (accessToken) {
        const validatedOrError = await this.validateToken.execute({ accessToken })
        if (validatedOrError.isRight()) {
          const userId = validatedOrError.value.userId
          const isAdmin = validatedOrError.value.isAdmin

          if (userId) {
            request.userId = userId
            request.isAdmin = isAdmin
            return ok({ userId: validatedOrError.value.userId, isAdmin: request.isAdmin })
          } else {
            return unauthorized()
          }
        }
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    userId?:string
    isAdmin?:boolean
    accessToken?: string
  }
}
