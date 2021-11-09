import { makeSlugifyAdapter } from '@shared/factories/make-slugify-adapter'
import { Controller } from '@shared/presentation/protocols/controller'

import { CreateGroupController } from '../presentation/controllers/create-group'
import { GroupRepository } from '../repository/prisma/space'
import { CreateGroupUseCase } from '../use-cases/create-group'
import { makeCreateGroupValidation } from './make-create-group-validation'

export const makeCreateGroupController = (): Controller => {
  const groupRepository = new GroupRepository()
  const slugAdapter = makeSlugifyAdapter()
  const createSpaceUseCase = new CreateGroupUseCase(groupRepository, slugAdapter)
  const validation = makeCreateGroupValidation()
  const controller = new CreateGroupController(validation, createSpaceUseCase)
  return controller
}
