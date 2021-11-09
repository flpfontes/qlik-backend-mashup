
import { CreatePanels } from '@modules/panel/use-cases/contracts/create-panels'
import { CreatePanelsUseCase } from '@modules/panel/use-cases/create-panels'
import {
  ok,
  serverError,
  unauthorized
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class CreatePanelsController implements Controller {
  constructor (
    private readonly createPanelsUseCase: CreatePanelsUseCase
  ) {}

  async handle (request: CreatePanels.Params): Promise<HttpResponse> {
    try {
      const { panels, visionId } = request

      if (!visionId) {
        return unauthorized()
      }

      const createdPanels = await this.createPanelsUseCase.execute({ panels, visionId })

      return ok(createdPanels)
    } catch (error) {
      return serverError(error)
    }
  }
}
