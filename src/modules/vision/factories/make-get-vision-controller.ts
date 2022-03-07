
import { Controller } from '@shared/presentation/protocols/controller'

import { GetVisionController } from '../presentation/controllers/get-vision'
import { VisionRepository } from '../repository/prisma/vision'

export const makeGetVisionController = (): Controller => {
  const visionRepository = new VisionRepository()

  const controller = new GetVisionController(visionRepository)
  return controller
}
