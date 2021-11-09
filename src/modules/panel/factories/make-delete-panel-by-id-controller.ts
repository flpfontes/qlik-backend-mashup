import { Controller } from '@shared/presentation/protocols/controller'

import { DeletePanelByIdController } from '../presentation/controllers/delete-panel-by-id'
import { PanelRepository } from '../repository/prisma/panel'
import { DeletePanelByIdUseCase } from '../use-cases/delete-panel-by-id'

export const makeDeletePanelByIdController = (): Controller => {
  const panelRepository = new PanelRepository()
  const deletePanelByIdUseCase = new DeletePanelByIdUseCase(panelRepository)
  const controller = new DeletePanelByIdController(deletePanelByIdUseCase)
  return controller
}
