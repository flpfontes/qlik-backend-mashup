import { UserRepository } from '@modules/user/repository/prisma/user'
import { makePuppeteerAdapter } from '@shared/factories/make-puppeteer-adapater'
import { Controller } from '@shared/presentation/protocols/controller'

import { GetUsersQikAndInsertDbController } from '../presentation/controllers/get-users-qlik-and-insert-db'
import { GetUsersQlikAndInsertDbUseCase } from '../use-cases/get-users-qlik-and-insert-db'

export const makeGetUsersQlikAndInsertDbController = (): Controller => {
  const userRepository = new UserRepository()

  const puppeteerAdapater = makePuppeteerAdapter()
  const getUsersQlikAndInsertDbUseCase = new GetUsersQlikAndInsertDbUseCase(userRepository, puppeteerAdapater)
  const controller = new GetUsersQikAndInsertDbController(getUsersQlikAndInsertDbUseCase)
  return controller
}
