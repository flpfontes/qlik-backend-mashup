import { UserVisionRepository } from '../repository/prisma/user-vision'
import { RemoveAssociateUserVision } from './contracts/remove-associate-user-vison'

export class RemoveAssociateUserVisionUseCase implements RemoveAssociateUserVision {
  constructor (
    private readonly userVisionRepository: UserVisionRepository
  ) {}

  async execute (params:RemoveAssociateUserVision.Params): Promise<RemoveAssociateUserVision.Result> {
    const { visionId, userId } = params

    await this.userVisionRepository.removeAssociateUserVision({ visionId, userId })
  }
}
