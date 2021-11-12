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

    const userVisions = await prisma.$queryRawUnsafe<GetRelatedUsersByVisonIdRepository.Result>(
      `SELECT U.id as user_id, u.name as user_name, v.id as vision_id FROM user_panel UP
        FULL OUTER JOIN vision V
          ON UP.vision_id = v.id
        FULL OUTER JOIN "user" U
          ON UP.user_id = U.id
        WHERE UP.vision_id = $1 or UP.vision_id is null`, visionId)

    return userVisions
  }
}
