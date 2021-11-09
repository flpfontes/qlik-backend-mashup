
import { adaptMiddleware } from '@shared/adapters/http/express-middleware-adapter'

import { makeIsAdminMiddleware } from '../factories/make-is-admin-middleware'

export const isAdmin = adaptMiddleware(makeIsAdminMiddleware())
