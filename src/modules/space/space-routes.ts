import { auth } from '@modules/auth/middlewares/auth'
import { isAdmin } from '@modules/auth/middlewares/is-admin'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeCreateSpaceController } from './factories/make-create-space-controller'
import { makeEditSpaceController } from './factories/make-edit-space-controller'
import { makeGetSpacesByUserIdController } from './factories/make-get-spaces-by-user-id-controller'

export default (router: Router): void => {
  router.post('/space', [auth, isAdmin], adaptRoute(makeCreateSpaceController()))
  router.get('/space', auth, adaptRoute(makeGetSpacesByUserIdController()))
  router.put('/space/:id', [auth, isAdmin], adaptRoute(makeEditSpaceController()))
}
