import { badRequest, ok, serverError, unauthorized } from '@shared/presentation/helpers/http'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Middleware } from '@shared/presentation/protocols/middleware'

import { SpaceInvalid } from '../presentation/errors/space-invalid'
import { GetSpaceById } from '../use-cases/contracts/get-space-by-id'

export class SpaceMiddleware implements Middleware {
  constructor (
    private readonly getSpaceById: GetSpaceById
  ) {}

  async handle (request: SpaceMiddleware.Request): Promise<HttpResponse> {
    try {
      const { spaceId } = request

      if (!spaceId) {
        return badRequest(new SpaceInvalid())
      }

      const space = await this.getSpaceById.execute({ spaceId })

      if (space) {
        return ok({ spaceId })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SpaceMiddleware {
  export type Request = {
    spaceId:string;
  }
}
