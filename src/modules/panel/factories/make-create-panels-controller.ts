import { Controller } from '@shared/presentation/protocols/controller'

import { CreatePanelsController } from '../presentation/controllers/create-panels'
import { PanelRepository } from '../repository/prisma/panel'
import { CreatePanelsUseCase } from '../use-cases/create-panels'

export const makeCreatePanelsController = (): Controller => {
  const panelRepository = new PanelRepository()
  const createPanelUseCase = new CreatePanelsUseCase(panelRepository)
  const controller = new CreatePanelsController(createPanelUseCase)
  return controller
}
