import { Controller } from '@shared/presentation/protocols/controller'

import { GetAllUsersController } from '../presentation/controllers/get-all-users'
import { UserRepository } from '../repository/prisma/user'
import { GetAllUsersUseCase } from '../use-cases/get-all-users'

export const makeGetAllUsersController = (): Controller => {
  const userRepository = new UserRepository()
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
  const controller = new GetAllUsersController(getAllUsersUseCase)
  return controller
}
