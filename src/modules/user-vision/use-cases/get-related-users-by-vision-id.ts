import { UserRepository } from '@modules/user/repository/prisma/user'

import { UserVisionRepository } from '../repository/prisma/user-vision'
import { GetRelatedUsersByVisionId } from './contracts/get-related-users-by-vision-id'

export class GetRelatedUsersByVisionIdUseCase implements GetRelatedUsersByVisionId {
  constructor (
    private readonly userVisionRepository: UserVisionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute (params:GetRelatedUsersByVisionId.Params): Promise<GetRelatedUsersByVisionId.Result> {
    const { visionId } = params

    const usersVisions = await this.userVisionRepository.relatedUsersByVisonId({ visionId })
    const users = await this.userRepository.getAll()

    const relatedUserVision = users.map(user => {
      const findUserVision = usersVisions.find(uv => uv.userId === user.id)

      if (findUserVision) {
        return {
          userId: user.id,
          userName: user.name,
          visionId: findUserVision.visionId
        }
      }
      return {
        userId: user.id,
        userName: user.name,
        visionId: null
      }
    })

    return relatedUserVision
  }
}
