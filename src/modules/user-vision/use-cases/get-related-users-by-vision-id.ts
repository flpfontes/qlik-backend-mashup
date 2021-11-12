import { UserVisionRepository } from '../repository/prisma/user-vision'
import { GetRelatedUsersByVisionId } from './contracts/get-related-users-by-vision-id'

export class GetRelatedUsersByVisionIdUseCase implements GetRelatedUsersByVisionId {
  constructor (
    private readonly userVisionRepository: UserVisionRepository
  ) {}

  async execute (params:GetRelatedUsersByVisionId.Params): Promise<GetRelatedUsersByVisionId.Result> {
    const { visionId } = params

    const usersVision = await this.userVisionRepository.relatedUsersByVisonId({ visionId })

    return usersVision
  }
}
