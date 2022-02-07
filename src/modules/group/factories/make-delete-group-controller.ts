import { Controller } from '@shared/presentation/protocols/controller'

import { DeleteGroupController } from '../presentation/controllers/delete-group'
import { GroupRepository } from '../repository/prisma/group'

export const makeDeleteGroupController = (): Controller => {
  const groupRepository = new GroupRepository()
  const controller = new DeleteGroupController(groupRepository)
  return controller
}
