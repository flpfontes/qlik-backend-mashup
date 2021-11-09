import { AbstractSlugify } from '@shared/adapters/slug/contracts/abstract-slugify'
import { left, right } from '@shared/presentation/errors/either'

import { GroupAlreadyExistInsideSpace } from '../presentation/errors/group-already-exist-in-space'
import { GroupRepository } from '../repository/prisma/space'
import { CreateGroup } from './contracts/create-group'

export class CreateGroupUseCase implements CreateGroup {
  constructor (
    private readonly groupRepository: GroupRepository,
    private readonly slugAdapter: AbstractSlugify
  ) {}

  async execute (params: CreateGroup.Params): Promise<CreateGroup.Result> {
    const { spaceId, name } = params

    const slug = this.slugAdapter.generate(name)

    const groupExist = await this.groupRepository.getBySlugAndSpaceId({ slug, spaceId })

    console.log('groupExist', groupExist)

    if (!groupExist) {
      const group = await this.groupRepository.create({ name, slug, spaceId })

      return right(group)
    }

    return left(new GroupAlreadyExistInsideSpace())
  }
}
