import { PanelRepository } from '../repository/prisma/panel'
import { DeletePanelById } from './contracts/delete-panel-by-id'

export class DeletePanelByIdUseCase implements DeletePanelById {
  constructor (
    private readonly panelRepository: PanelRepository
  ) {}

  async execute (params: DeletePanelById.Params): Promise<DeletePanelById.Result> {
    const { id } = params
    await this.panelRepository.deleteById({ id })
  }
}
