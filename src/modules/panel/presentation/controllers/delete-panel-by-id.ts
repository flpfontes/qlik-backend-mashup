
import { DeletePanelById } from '@modules/panel/use-cases/contracts/delete-panel-by-id'
import { DeletePanelByIdUseCase } from '@modules/panel/use-cases/delete-panel-by-id'
import {
  noContent,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class DeletePanelByIdController implements Controller {
  constructor (
    private readonly deletePanelByIdUseCase: DeletePanelByIdUseCase
  ) {}

  async handle (request: DeletePanelById.Params): Promise<HttpResponse> {
    try {
      const { id } = request

      await this.deletePanelByIdUseCase.execute({ id })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
