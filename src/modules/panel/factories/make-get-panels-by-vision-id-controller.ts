import { Controller } from '@shared/presentation/protocols/controller'

import { GetPanelsByVisionIdController } from '../presentation/controllers/get-panels-by-vision-id'
import { PanelRepository } from '../repository/prisma/panel'
import { GetPanelsByVisionIdUseCase } from '../use-cases/get-panels-by-vision-id'

export const makeGetPanelByVisionIdController = (): Controller => {
  const panelRepository = new PanelRepository()
  const getPanelsByVisionIdUseCase = new GetPanelsByVisionIdUseCase(panelRepository)
  const controller = new GetPanelsByVisionIdController(getPanelsByVisionIdUseCase)
  return controller
}
