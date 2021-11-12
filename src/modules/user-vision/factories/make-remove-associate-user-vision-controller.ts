import { Controller } from '@shared/presentation/protocols/controller'

import { RemoveAssociateUserVisionController } from '../presentation/controllers/remove-associate-user-vision'
import { UserVisionRepository } from '../repository/prisma/user-vision'
import { RemoveAssociateUserVisionUseCase } from '../use-cases/remove-associate-user-vision'

export const makeRemoveAssociateUserVisionController = (): Controller => {
  const userVisionRepository = new UserVisionRepository()
  const RemoveassociateUserVisionUseCase = new RemoveAssociateUserVisionUseCase(userVisionRepository)
  const controller = new RemoveAssociateUserVisionController(RemoveassociateUserVisionUseCase)
  return controller
}
