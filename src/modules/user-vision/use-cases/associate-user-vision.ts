import { UserVisionRepository } from '../repository/prisma/user-vision'
import { AssociateUserVision } from './contracts/associate-user-vison'

export class AssociateUserVisionUseCase implements AssociateUserVision {
  constructor (
    private readonly userVisionRepository: UserVisionRepository
  ) {}

  async execute (params:AssociateUserVision.Params): Promise<AssociateUserVision.Result> {
    const { visionId, userId } = params

    const usersVision = await this.userVisionRepository.associateUserVision({ visionId, userId })

    return usersVision
  }
}
