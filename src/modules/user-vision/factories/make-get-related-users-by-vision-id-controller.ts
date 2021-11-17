import { UserRepository } from '@modules/user/repository/prisma/user'
import { Controller } from '@shared/presentation/protocols/controller'

import { GetRelatedUsersByVisionIdController } from '../presentation/controllers/get-related-users-by-vision-id'
import { UserVisionRepository } from '../repository/prisma/user-vision'
import { GetRelatedUsersByVisionIdUseCase } from '../use-cases/get-related-users-by-vision-id'

export const makeGetRelatedUsersByVisionIdController = (): Controller => {
  const userVisionRepository = new UserVisionRepository()
  const userRepository = new UserRepository()

  const getRelatedUsersByVisionIdUseCase = new GetRelatedUsersByVisionIdUseCase(userVisionRepository, userRepository)
  const controller = new GetRelatedUsersByVisionIdController(getRelatedUsersByVisionIdUseCase)
  return controller
}
