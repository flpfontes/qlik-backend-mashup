import { auth } from '@modules/auth/middlewares/auth'
import { isAdmin } from '@modules/auth/middlewares/is-admin'
import { space } from '@modules/space/middlewares/space'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeCreateVisionController } from './factories/make-create-vision-controller'
import { makeGetVisionController } from './factories/make-get-vision-controller'
import { makeUpdateLayoutByVisionIdController } from './factories/make-update-layout-by-vision-id-controller'

export default (router: Router): void => {
  router.put('/vision/:id', [auth, space], adaptRoute(makeUpdateLayoutByVisionIdController()))
  router.post('/vision', [auth, space, isAdmin], adaptRoute(makeCreateVisionController()))
  router.get('/vision/:visionId', [auth, space, isAdmin], adaptRoute(makeGetVisionController()))
}
