import { GetSpacesByUserId } from '@modules/space/use-cases/contracts/get-spaces-by-user-id'
import {
  noContent,
  ok,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetSpacesByUserIdController implements Controller {
  constructor (
    private readonly getSpacesByUserIdUseCase: GetSpacesByUserId
  ) {}

  async handle (request: GetSpacesByUserId.Params): Promise<HttpResponse> {
    try {
      const { userId, isAdmin } = request

      if (!userId) {
        return unauthorized()
      }

      const spaces = await this.getSpacesByUserIdUseCase.execute({ userId, isAdmin })

      if (spaces.length === 0) {
        return noContent()
      }
      return ok(spaces)
    } catch (error) {
      return serverError(error)
    }
  }
}
