import { Middleware } from '@shared/presentation/protocols/middleware'

import { SpaceMiddleware } from '../middlewares/space-middleware'
import { SpaceRepository } from '../repository/prisma/space'
import { GetSpaceByIdUseCase } from '../use-cases/get-space-by-id'

export const makeSpaceMiddleware = (): Middleware => {
  const spaceRepository = new SpaceRepository()

  const getSpaceByIdUseCase = new GetSpaceByIdUseCase(spaceRepository)
  return new SpaceMiddleware(getSpaceByIdUseCase)
}
