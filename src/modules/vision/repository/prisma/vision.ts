import { prisma } from '@shared/infra/prisma/prisma'

import { CreateVisionRepository } from '../contracts/create-vision'
import { GetVisionByIdRepository } from '../contracts/get-vision-by-id'
import { GetVisionBySlugRepository } from '../contracts/get-vision-by-slug'
import { UpdateLayoutByVisionIdRepository } from '../contracts/update-layout-by-vision-id'

export class VisionRepository implements UpdateLayoutByVisionIdRepository, CreateVisionRepository, GetVisionBySlugRepository, GetVisionByIdRepository {
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

  async getBySlugAndGroupId (params:GetVisionBySlugRepository.Params): Promise<GetVisionBySlugRepository.Result> {
    const { slug, groupId } = params
    const vision = await prisma.vision.findFirst({
      where: {
        slug,
        groupId
      },
      orderBy: {
        name: 'asc'
      }
    })
    return vision
  }

  async getById (params: GetVisionByIdRepository.Params):Promise<GetVisionByIdRepository.Result> {
    const { visionId } = params

    const vision = await prisma.vision.findUnique({
      where: {
        id: visionId
      }
    })

    return vision
  }
}
