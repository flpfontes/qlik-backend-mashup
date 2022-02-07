import { Controller } from '@shared/presentation/protocols/controller'

import { DeleteSpaceController } from '../presentation/controllers/delete-space'
import { SpaceRepository } from '../repository/prisma/space'

export const makeDeleteSpaceController = (): Controller => {
  const spaceRepository = new SpaceRepository()

  const controller = new DeleteSpaceController(spaceRepository)
  return controller
}
