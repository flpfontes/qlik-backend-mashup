import { AbstractSlugify } from '@shared/adapters/slug/contracts/abstract-slugify'
import { left, right } from '@shared/presentation/errors/either'

import { SpaceAlreadyExistError } from '../presentation/errors/space-already-exist'
import { SpaceRepository } from '../repository/prisma/space'
import { CreateSpace } from './contracts/create-space'

export class CreateSpaceUseCase implements CreateSpace {
  constructor (
    private readonly spaceRepository: SpaceRepository,
    private readonly slugAdapter: AbstractSlugify
  ) {}

  async execute (params: CreateSpace.Params): Promise<CreateSpace.Result> {
    const { name } = params

    const slug = this.slugAdapter.generate(name)

    const spaceExist = await this.spaceRepository.getBySlug({ slug })

    if (!spaceExist) {
      const space = await this.spaceRepository.create({ name, slug })

      return right(space)
    }

    return left(new SpaceAlreadyExistError())
  }
}
