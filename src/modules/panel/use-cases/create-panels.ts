import { PanelRepository } from '../repository/prisma/panel'
import { CreatePanels } from './contracts/create-panels'

export class CreatePanelsUseCase implements CreatePanels {
  constructor (
    private readonly panelRepository: PanelRepository
  ) {}

  async execute (params: CreatePanels.Params): Promise<CreatePanels.Result> {
    const { visionId, panels } = params
    const createdPanels = await this.panelRepository.create({ visionId, panels })

    return createdPanels
  }
}
