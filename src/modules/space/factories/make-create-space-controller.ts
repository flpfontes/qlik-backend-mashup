import { makeSlugifyAdapter } from '@shared/factories/make-slugify-adapter'
import { Controller } from '@shared/presentation/protocols/controller'

import { CreateSpaceController } from '../presentation/controllers/crate-space'
import { SpaceRepository } from '../repository/prisma/space'
import { CreateSpaceUseCase } from '../use-cases/create-space'
import { makeCreateSpaceValidation } from './make-create-space-validation'

export const makeCreateSpaceController = (): Controller => {
  const spaceRepository = new SpaceRepository()
  const slugAdapter = makeSlugifyAdapter()
  const createSpaceUseCase = new CreateSpaceUseCase(spaceRepository, slugAdapter)
  const validation = makeCreateSpaceValidation()
  const controller = new CreateSpaceController(validation, createSpaceUseCase)
  return controller
}
