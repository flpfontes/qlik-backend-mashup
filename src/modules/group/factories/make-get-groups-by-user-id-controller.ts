import { Controller } from '@shared/presentation/protocols/controller'

import { GetGroupsBySpaceIdController } from '../presentation/controllers/get-groups-by-space-id'
import { GroupRepository } from '../repository/prisma/group'
import { GetGroupsBySpaceIdUseCase } from '../use-cases/get-groups-by-space-id'

export const makeGetGroupsBySpaceIdController = (): Controller => {
  const groupRepository = new GroupRepository()

  const creategroupBySpaceIdUseCase = new GetGroupsBySpaceIdUseCase(groupRepository)

  const controller = new GetGroupsBySpaceIdController(creategroupBySpaceIdUseCase)
  return controller
}
