import { ok, serverError, unauthorized } from '@shared/presentation/helpers/http'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Middleware } from '@shared/presentation/protocols/middleware'

import { ValidateToken } from '../use-cases/contracts/validate-token'

export class IsAdminMiddleware implements Middleware {
  constructor (
    private readonly validateToken: ValidateToken
  ) {}

  async handle (request: IsAdminMiddleware.Request): Promise<HttpResponse> {
    try {
      const { isAdmin } = request

      if (isAdmin) {
        request.isAdmin = isAdmin
        return ok({ isAdmin: isAdmin })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace IsAdminMiddleware {
  export type Request = {
    userId?:string
    isAdmin?:boolean
    accessToken?: string
  }
}
