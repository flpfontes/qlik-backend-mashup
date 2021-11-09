import { makeSlugifyAdapter } from '@shared/factories/make-slugify-adapter'
import { Controller } from '@shared/presentation/protocols/controller'

import { CreateVisionController } from '../presentation/controllers/create-vision'
import { VisionRepository } from '../repository/prisma/vision'
import { CreateVisionUseCase } from '../use-cases/create-vision'
import { makeCreateVisionValidation } from './make-create-vision-validation'

export const makeCreateVisionController = (): Controller => {
  const visionRepository = new VisionRepository()
  const slugAdapter = makeSlugifyAdapter()
  const createVisionUseCase = new CreateVisionUseCase(visionRepository, slugAdapter)

  const validations = makeCreateVisionValidation()
  const controller = new CreateVisionController(validations, createVisionUseCase)
  return controller
}
