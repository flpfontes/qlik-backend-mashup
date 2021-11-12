import { UserVisionRepository } from '@modules/user-vision/repository/prisma/user-vision'
import { AbstractSlugify } from '@shared/adapters/slug/contracts/abstract-slugify'
import { left, right } from '@shared/presentation/errors/either'

import { VisionAlreadyExistError } from '../presentation/errors/vision-already-exist'
import { VisionRepository } from '../repository/prisma/vision'
import { CreateVision } from './contracts/create-vision'

export class CreateVisionUseCase implements CreateVision {
  constructor (
    private readonly visionRepository: VisionRepository,
    private readonly userVisionRepository:UserVisionRepository,
    private readonly slugAdapter: AbstractSlugify
  ) {}

  async execute (params: CreateVision.Params): Promise<CreateVision.Result> {
    const { name, groupId, userId } = params

    const slug = this.slugAdapter.generate(name)

    const visionExist = await this.visionRepository.getBySlug({ slug })

    if (visionExist) {
      return left(new VisionAlreadyExistError())
    }

    const vision = await this.visionRepository.create({ groupId, name, slug })
    await this.userVisionRepository.relateUserVision({ visionId: vision.id, userId: userId })

    return right(vision)
  }
}
