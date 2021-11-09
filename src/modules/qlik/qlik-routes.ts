import { auth } from '@modules/auth/middlewares/auth'
import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeGetObjectsBySheetIdController } from './factories/make-get-objects-by-sheets-id-controller'
import { makeGetSpacesAppsSheetsQlikController } from './factories/make-get-spaces-apps-sheets-qlik-controller'
import { makeGetUsersQlikAndInsertDbController } from './factories/make-get-users-qlik-and-insert-db-controller'

export default (router: Router): void => {
  router.get('/users-qlik', auth, adaptRoute(makeGetUsersQlikAndInsertDbController()))
  router.get('/apps-qlik', auth, adaptRoute(makeGetSpacesAppsSheetsQlikController()))
  router.get('/apps-qlik/:resourceId', auth, adaptRoute(makeGetObjectsBySheetIdController()))
}
