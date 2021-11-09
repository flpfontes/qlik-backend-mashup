
import { adaptMiddleware } from '@shared/adapters/http/express-middleware-adapter'

import { makeAuthMiddleware } from '../factories/make-auth-middleware'

export const auth = adaptMiddleware(makeAuthMiddleware())
