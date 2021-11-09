import { makePuppeteerAdapter } from '@shared/factories/make-puppeteer-adapater'
import { Controller } from '@shared/presentation/protocols/controller'

import { GetSpacesAppsSheetsQlikController } from '../presentation/controllers/get-spaces-apps-sheets-qlik'
import { GetAppsUseCase } from '../use-cases/get-apps'
import { GetSheetsUseCase } from '../use-cases/get-sheets'
import { GetSpacesUseCase } from '../use-cases/get-spaces'
import { GetSpacesAppsSheetsQlikUseCase } from '../use-cases/get-spaces-apps-sheets-qlik'

export const makeGetSpacesAppsSheetsQlikController = (): Controller => {
  const puppeteerAdapater = makePuppeteerAdapter()

  const getSpacesUseCase = new GetSpacesUseCase(puppeteerAdapater)
  const getAppsUseCase = new GetAppsUseCase(puppeteerAdapater)
  const getSheetsUseCase = new GetSheetsUseCase(puppeteerAdapater)

  const getSpacesAppsSheetsQlikUseCase = new GetSpacesAppsSheetsQlikUseCase(getSpacesUseCase, getAppsUseCase, getSheetsUseCase, puppeteerAdapater)
  const controller = new GetSpacesAppsSheetsQlikController(getSpacesAppsSheetsQlikUseCase)
  return controller
}
