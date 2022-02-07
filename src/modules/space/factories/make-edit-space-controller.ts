import { makeSlugifyAdapter } from '@shared/factories/make-slugify-adapter'
import { Controller } from '@shared/presentation/protocols/controller'

import { EditSpaceController } from '../presentation/controllers/edit-space'
import { SpaceRepository } from '../repository/prisma/space'
import { EditSpaceUseCase } from '../use-cases/edit-space'
import { makeCreateSpaceValidation } from './make-create-space-validation'

export const makeEditSpaceController = (): Controller => {
  const spaceRepository = new SpaceRepository()
  const slugAdapter = makeSlugifyAdapter()
  const editSpaceUseCase = new EditSpaceUseCase(spaceRepository, slugAdapter)
  const validation = makeCreateSpaceValidation()
  const controller = new EditSpaceController(validation, editSpaceUseCase)
  return controller
}
