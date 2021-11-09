import { VisionRepository } from '../repository/prisma/vision'
import { UpdateLayoutByVisionId } from './contracts/update-layout-by-vision-id'

export class UpdateLayoutByVisionIdUseCase implements UpdateLayoutByVisionId {
  constructor (
    private readonly visionRepository: VisionRepository
  ) {}

  async execute (params: UpdateLayoutByVisionId.Params): Promise<UpdateLayoutByVisionId.Result> {
    const { id, layout } = params

    const parseJson = JSON.parse(layout)

    const vision = await this.visionRepository.updateLayoutByVisionId({ id, layout: parseJson })
    return vision
  }
}
