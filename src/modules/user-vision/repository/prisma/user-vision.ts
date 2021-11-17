import { prisma } from '@shared/infra/prisma/prisma'

import { AssociateUserVisionRepository } from '../contracts/associate-user-vison'
import { GetRelatedUsersByVisonIdRepository } from '../contracts/get-related-users-by-vision-d'
import { RemoveAssociateUserVisionRepository } from '../contracts/remove-associate-user-vison'

export class UserVisionRepository implements GetRelatedUsersByVisonIdRepository, AssociateUserVisionRepository, RemoveAssociateUserVisionRepository {
  async associateUserVision (params:AssociateUserVisionRepository.Params):Promise<AssociateUserVisionRepository.Result> {
    const { visionId, userId } = params

    const visions = await prisma.userVision.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        vision: {
          connect: {
            id: visionId
          }
        }
      }
    })

    return visions
  }

  async removeAssociateUserVision (params:RemoveAssociateUserVisionRepository.Params):Promise<RemoveAssociateUserVisionRepository.Result> {
    const { userId, visionId } = params

    await prisma.userVision.deleteMany({
      where: {
        userId, visionId
      }
    })
  }

  async relatedUsersByVisonId (params:GetRelatedUsersByVisonIdRepository.Params):Promise<GetRelatedUsersByVisonIdRepository.Result> {
    const { visionId } = params

    const userVisions = await prisma.userVision.findMany({
      where: {
        visionId
      }
    })

    return userVisions
  }
}
