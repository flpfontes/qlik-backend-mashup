
import { adaptMiddleware } from '@shared/adapters/http/express-middleware-adapter'

import { makeSpaceMiddleware } from '../factories/make-space-middleware'

export const space = adaptMiddleware(makeSpaceMiddleware())
