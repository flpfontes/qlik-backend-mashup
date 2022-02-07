import { makeSlugifyAdapter } from '@shared/factories/make-slugify-adapter'
import { Controller } from '@shared/presentation/protocols/controller'

import { EditGroupController } from '../presentation/controllers/edit-group'
import { GroupRepository } from '../repository/prisma/group'
import { EditGroupUseCase } from '../use-cases/edit-group'
import { makeCreateGroupValidation } from './make-create-group-validation'

export const makeEditGroupController = (): Controller => {
  const groupRepository = new GroupRepository()
  const slugAdapter = makeSlugifyAdapter()
  const createSpaceUseCase = new EditGroupUseCase(groupRepository, slugAdapter)
  const validation = makeCreateGroupValidation()
  const controller = new EditGroupController(validation, createSpaceUseCase)
  return controller
}
