import { GetPanelsByVisionId } from '@modules/panel/use-cases/contracts/get-panels-by-vision-id'
import { GetPanelsByVisionIdUseCase } from '@modules/panel/use-cases/get-panels-by-vision-id'
import {
  noContent,
  ok,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetPanelsByVisionIdController implements Controller {
  constructor (
    private readonly getPanelsByVisionIdUseCase: GetPanelsByVisionIdUseCase
  ) {}

  async handle (request: GetPanelsByVisionId.Params): Promise<HttpResponse> {
    try {
      const { id: visionId } = request

      if (!visionId) {
        return unauthorized()
      }

      const panels = await this.getPanelsByVisionIdUseCase.execute({ id: visionId })

      if (panels.length === 0) {
        return noContent()
      }
      return ok(panels)
    } catch (error) {
      return serverError(error)
    }
  }
}
