import { GetGroupsBySpaceId } from '@modules/group/use-cases/contracts/get-groups-by-space-id'
import {
  noContent,
  ok,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetGroupsBySpaceIdController implements Controller {
  constructor (
    private readonly getGroupsBySpaceIdUseCase: GetGroupsBySpaceId
  ) {}

  async handle (request: GetGroupsBySpaceId.Params): Promise<HttpResponse> {
    try {
      const { spaceId, isAdmin, userId } = request

      if (!spaceId) {
        return unauthorized()
      }

      const groups = await this.getGroupsBySpaceIdUseCase.execute({ spaceId, isAdmin, userId })

      if (groups.length === 0) {
        return noContent()
      }
      return ok(groups)
    } catch (error) {
      return serverError(error)
    }
  }
}
