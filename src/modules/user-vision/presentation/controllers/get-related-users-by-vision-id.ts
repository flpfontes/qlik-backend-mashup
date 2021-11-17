
import { GetRelatedUsersByVisionId } from '@modules/user-vision/use-cases/contracts/get-related-users-by-vision-id'
import {
  ok,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetRelatedUsersByVisionIdController implements Controller {
  constructor (
    private readonly getRelatedUsersByVisionIdUseCase: GetRelatedUsersByVisionId
  ) {}

  async handle (request: GetRelatedUsersByVisionId.Params): Promise<HttpResponse> {
    const { visionId } = request

    try {
      if (!visionId) {
        return unauthorized()
      }

      const usersVisions = await this.getRelatedUsersByVisionIdUseCase.execute({ visionId })

      return ok(usersVisions)
    } catch (error) {
      return serverError(error)
    }
  }
}
