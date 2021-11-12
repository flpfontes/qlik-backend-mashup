import { Controller } from '@shared/presentation/protocols/controller'

import { AssociateUserVisionController } from '../presentation/controllers/associate-user-vision'
import { UserVisionRepository } from '../repository/prisma/user-vision'
import { AssociateUserVisionUseCase } from '../use-cases/associate-user-vision'

export const makeAssociateUserVisionController = (): Controller => {
  const userVisionRepository = new UserVisionRepository()
  const associateUserVisionUseCase = new AssociateUserVisionUseCase(userVisionRepository)
  const controller = new AssociateUserVisionController(associateUserVisionUseCase)
  return controller
}
