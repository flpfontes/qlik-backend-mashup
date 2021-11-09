import { auth } from '@modules/auth/middlewares/auth'
import { isAdmin } from '@modules/auth/middlewares/is-admin'
import { space } from '@modules/space/middlewares/space'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeCreateGroupController } from './factories/make-create-group-controller'
import { makeGetGroupsBySpaceIdController } from './factories/make-get-groups-by-user-id-controller'

export default (router: Router): void => {
  router.post('/group', [auth, isAdmin, space], adaptRoute(makeCreateGroupController()))
  router.get('/group', [auth, space], adaptRoute(makeGetGroupsBySpaceIdController()))
}
