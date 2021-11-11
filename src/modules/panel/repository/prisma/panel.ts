import { prisma } from '@shared/infra/prisma/prisma'

import { CreatePanelsRepository } from '../contracts/create-panels'
import { DeletePanelByIdRepository } from '../contracts/delete-panel-by-id'
import { GetPanelByVisionIdRepository } from '../contracts/get-panels-by-vision-id'

export class PanelRepository implements GetPanelByVisionIdRepository, DeletePanelByIdRepository, CreatePanelsRepository {
  async getByGroupId (params: GetPanelByVisionIdRepository.Params): Promise<GetPanelByVisionIdRepository.Result> {
    const { visionId } = params

    const vision = await prisma.panel.findMany({
      where: {
        visionId
      }
    })

    return vision
  }

  async deleteById (params:DeletePanelByIdRepository.Params):Promise<DeletePanelByIdRepository.Result> {
    const { id } = params

    await prisma.panel.delete({
      where: {
        id
      }
    })
  }

  async create (params:CreatePanelsRepository.Params):Promise<CreatePanelsRepository.Result> {
    const { panels, visionId } = params

    const createManyPanel = panels.map((panel) =>
      prisma.panel.create({
        data: {
          name: panel.name,
          url: panel.url,
          visionId: visionId,
          isFull: panel.isFull
        }
      })
    )

    const createdPanels = await Promise.all(createManyPanel)

    return createdPanels
  }
}
