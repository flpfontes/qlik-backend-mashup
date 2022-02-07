import { AbstractSlugify } from '@shared/adapters/slug/contracts/abstract-slugify'
import { left, right } from '@shared/presentation/errors/either'

import { GroupAlreadyExistInsideSpace } from '../presentation/errors/group-already-exist-in-space'
import { GroupRepository } from '../repository/prisma/group'
import { EditGroup } from './contracts/edit-group'

export class EditGroupUseCase implements EditGroup {
  constructor (
    private readonly groupRepository: GroupRepository,
    private readonly slugAdapter: AbstractSlugify
  ) {}

  async execute (params: EditGroup.Params): Promise<EditGroup.Result> {
    const { id, name, spaceId } = params

    const slug = this.slugAdapter.generate(name)

    const groupExist = await this.groupRepository.getBySlugAndSpaceId({ slug, spaceId })

    if (!groupExist) {
      const group = await this.groupRepository.edit({ name, slug, id })

      return right(group)
    }

    return left(new GroupAlreadyExistInsideSpace())
  }
}
