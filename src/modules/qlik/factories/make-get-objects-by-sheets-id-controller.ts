import { makePuppeteerAdapter } from '@shared/factories/make-puppeteer-adapater'
import { Controller } from '@shared/presentation/protocols/controller'

import { GetObjectsBySheetIdController } from '../presentation/controllers/get-objects-by-sheet-id'
import { GetObjectsUseCase } from '../use-cases/get-objects'

export const makeGetObjectsBySheetIdController = (): Controller => {
  const puppeteerAdapater = makePuppeteerAdapter()
  const getObjectsUseCase = new GetObjectsUseCase(puppeteerAdapater)

  const controller = new GetObjectsBySheetIdController(getObjectsUseCase)
  return controller
}
