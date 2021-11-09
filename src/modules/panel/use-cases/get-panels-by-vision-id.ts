import { PanelRepository } from '../repository/prisma/panel'
import { GetPanelsByVisionId } from './contracts/get-panels-by-vision-id'

export class GetPanelsByVisionIdUseCase implements GetPanelsByVisionId {
  constructor (
    private readonly panelRepository: PanelRepository
  ) {}

  async execute (params: GetPanelsByVisionId.Params): Promise<GetPanelsByVisionId.Result> {
    const { id } = params
    const panels = await this.panelRepository.getByGroupId({ visionId: id })

    return panels
  }
}
