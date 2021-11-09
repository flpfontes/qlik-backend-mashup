import { prisma } from '@shared/infra/prisma/prisma'

import { CreateVisionRepository } from '../contracts/create-vision'
import { GetVisionBySlugRepository } from '../contracts/get-vision-by-slug'
import { UpdateLayoutByVisionIdRepository } from '../contracts/update-layout-by-vision-id'

export class VisionRepository implements UpdateLayoutByVisionIdRepository, CreateVisionRepository, GetVisionBySlugRepository {
  async updateLayoutByVisionId (params: UpdateLayoutByVisionIdRepository.Params): Promise<UpdateLayoutByVisionIdRepository.Result> {
    const { id, layout } = params

    const vision = await prisma.vision.update({
      where: {
        id
      },
      data: {
        layout
      }
    })

    return vision
  }

  async create (params:CreateVisionRepository.Params): Promise<CreateVisionRepository.Result> {
    const { name, slug, groupId } = params

    const vision = await prisma.vision.create({
      data: {
        name,
        slug,
        group: {
          connect: {
            id: groupId
          }
        }
      }
    })

    return vision
  }

  async getBySlug (params:GetVisionBySlugRepository.Params): Promise<GetVisionBySlugRepository.Result> {
    const { slug } = params
    const vision = await prisma.vision.findFirst({
      where: {
        slug
      }
    })
    return vision
  }
}
