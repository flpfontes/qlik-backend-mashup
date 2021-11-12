
import { RemoveAssociateUserVision } from '@modules/user-vision/use-cases/contracts/remove-associate-user-vison'
import {
  noContent,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class RemoveAssociateUserVisionController implements Controller {
  constructor (
    private readonly removeAssociateUserVisionUseCase: RemoveAssociateUserVision
  ) {}

  async handle (request: RemoveAssociateUserVision.Params): Promise<HttpResponse> {
    const { visionId, userId } = request

    try {
      if (!visionId || !userId) {
        return unauthorized()
      }

      await this.removeAssociateUserVisionUseCase.execute({ visionId, userId })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
