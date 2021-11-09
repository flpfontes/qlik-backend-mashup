import { auth } from '@modules/auth/middlewares/auth'
import { isAdmin } from '@modules/auth/middlewares/is-admin'
import { space } from '@modules/space/middlewares/space'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeCreatePanelsController } from './factories/make-create-panels-controller'
import { makeDeletePanelByIdController } from './factories/make-delete-panel-by-id-controller'
import { makeGetPanelByVisionIdController } from './factories/make-get-panels-by-vision-id-controller'

export default (router: Router): void => {
  // router.post('/group', [auth, isAdmin, space], adaptRoute(makeCreateGroupController()))
  router.get('/panel/:id', [auth, space], adaptRoute(makeGetPanelByVisionIdController()))
  router.post('/panel', [auth, isAdmin, space], adaptRoute(makeCreatePanelsController()))
  router.delete('/panel/:id', [auth, space], adaptRoute(makeDeletePanelByIdController()))
}
