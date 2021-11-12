import { auth } from '@modules/auth/middlewares/auth'
import { isAdmin } from '@modules/auth/middlewares/is-admin'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeAssociateUserVisionController } from './factories/make-associate-user-vision-controller'
import { makeGetRelatedUsersByVisionIdController } from './factories/make-get-related-users-by-vision-id-controller'
import { makeRemoveAssociateUserVisionController } from './factories/make-remove-associate-user-vision-controller'

export default (router: Router): void => {
  router.get('/user-vision/:visionId', [auth, isAdmin], adaptRoute(makeGetRelatedUsersByVisionIdController()))
  router.post('/user-vision', [auth, isAdmin], adaptRoute(makeAssociateUserVisionController()))
  router.delete('/user-vision/:visionId', [auth, isAdmin], adaptRoute(makeRemoveAssociateUserVisionController()))
}
