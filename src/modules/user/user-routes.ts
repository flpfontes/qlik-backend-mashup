import { auth } from '@modules/auth/middlewares/auth'
import { isAdmin } from '@modules/auth/middlewares/is-admin'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeGetAllUsersController } from './factories/make-get-all-users-controller'

export default (router: Router): void => {
  router.get('/user', [auth, isAdmin], adaptRoute(makeGetAllUsersController()))
}
