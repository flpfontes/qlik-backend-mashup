import { Controller } from '@shared/presentation/protocols/controller'

import { UpdateLayoutByVisionIdController } from '../presentation/controllers/update-layout-by-vision-id'
import { VisionRepository } from '../repository/prisma/vision'
import { UpdateLayoutByVisionIdUseCase } from '../use-cases/update-layout-by-vision-id'

export const makeUpdateLayoutByVisionIdController = (): Controller => {
  const visionRepository = new VisionRepository()
  const updateLayoutByVisionIdUseCase = new UpdateLayoutByVisionIdUseCase(visionRepository)
  const controller = new UpdateLayoutByVisionIdController(updateLayoutByVisionIdUseCase)
  return controller
}
