import { Controller } from '@shared/presentation/protocols/controller'

import { GetRelatedUsersByVisionIdController } from '../presentation/controllers/get-related-users-by-vision-id'
import { UserVisionRepository } from '../repository/prisma/user-vision'
import { GetRelatedUsersByVisionIdUseCase } from '../use-cases/get-related-users-by-vision-id'

export const makeGetRelatedUsersByVisionIdController = (): Controller => {
  const userVisionRepository = new UserVisionRepository()
  const getRelatedUsersByVisionIdUseCase = new GetRelatedUsersByVisionIdUseCase(userVisionRepository)
  const controller = new GetRelatedUsersByVisionIdController(getRelatedUsersByVisionIdUseCase)
  return controller
}
