import { AbstractSlugify } from '@shared/adapters/slug/contracts/abstract-slugify'
import { left, right } from '@shared/presentation/errors/either'

import { SpaceAlreadyExistError } from '../presentation/errors/space-already-exist'
import { SpaceRepository } from '../repository/prisma/space'
import { EditSpace } from './contracts/edit-space'

export class EditSpaceUseCase implements EditSpace {
  constructor (
    private readonly spaceRepository: SpaceRepository,
    private readonly slugAdapter: AbstractSlugify
  ) {}

  async execute (params: EditSpace.Params): Promise<EditSpace.Result> {
    const { name, id } = params

    const slug = this.slugAdapter.generate(name)

    const spaceExist = await this.spaceRepository.getBySlug({ slug })

    if (!spaceExist) {
      const space = await this.spaceRepository.edit({ id, name, slug })

      return right(space)
    }

    return left(new SpaceAlreadyExistError())
  }
}
