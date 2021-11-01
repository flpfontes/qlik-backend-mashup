import { adaptRoute } from '@shared/adapters/http/express-route-adapter'
import { Router } from 'express'

import { makeSignInByQlikIdController } from './factories/make-sign-in-by-qlik-id-controller'

export default (router: Router): void => {
  router.post('/auth', adaptRoute(makeSignInByQlikIdController()))
}
