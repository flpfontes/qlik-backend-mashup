
import { UpdateLayoutByVisionId } from '@modules/vision/use-cases/contracts/update-layout-by-vision-id'
import { UpdateLayoutByVisionIdUseCase } from '@modules/vision/use-cases/update-layout-by-vision-id'
import {
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class UpdateLayoutByVisionIdController implements Controller {
  constructor (
    private readonly updateLayoutByVisionIdUseCase: UpdateLayoutByVisionIdUseCase
  ) {}

  async handle (request: UpdateLayoutByVisionId.Params): Promise<HttpResponse> {
    try {
      const { id, layout } = request

      const vision = await this.updateLayoutByVisionIdUseCase.execute({ id, layout })

      return ok(vision)
    } catch (error) {
      return serverError(error)
    }
  }
}
