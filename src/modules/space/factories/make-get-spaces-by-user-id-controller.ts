import { Controller } from '@shared/presentation/protocols/controller'

import { GetSpacesByUserIdController } from '../presentation/controllers/get-spaces-by-user-id'
import { SpaceRepository } from '../repository/prisma/space'
import { GetSpacesByUserIdUseCase } from '../use-cases/get-spaces-by-user-id'

export const makeGetSpacesByUserIdController = (): Controller => {
  const spaceRepository = new SpaceRepository()

  const createSpaceUseCase = new GetSpacesByUserIdUseCase(spaceRepository)

  const controller = new GetSpacesByUserIdController(createSpaceUseCase)
  return controller
}
