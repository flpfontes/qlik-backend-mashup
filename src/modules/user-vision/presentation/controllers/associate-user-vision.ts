
import { AssociateUserVision } from '@modules/user-vision/use-cases/contracts/associate-user-vison'
import {
  ok,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class AssociateUserVisionController implements Controller {
  constructor (
    private readonly associateUserVisionUseCase: AssociateUserVision
  ) {}

  async handle (request: AssociateUserVision.Params): Promise<HttpResponse> {
    const { visionId, userId } = request

    console.log('request', request)

    try {
      if (!visionId || !userId) {
        return unauthorized()
      }

      const usersVisions = await this.associateUserVisionUseCase.execute({ visionId, userId })

      return ok(usersVisions)
    } catch (error) {
      return serverError(error)
    }
  }
}
