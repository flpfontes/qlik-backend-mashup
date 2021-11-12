
import { CreateVision } from '@modules/vision/use-cases/contracts/create-vision'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Validation } from '@shared/presentation/protocols/validation'

export class CreateVisionController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createVisionUseCase: CreateVision
  ) {}

  async handle (request: CreateVision.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { groupId, name, userId } = request

      const visionOrError = await this.createVisionUseCase.execute({ groupId, name, userId })

      if (visionOrError.isLeft()) {
        return forbidden(visionOrError.value)
      }

      return ok(visionOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
