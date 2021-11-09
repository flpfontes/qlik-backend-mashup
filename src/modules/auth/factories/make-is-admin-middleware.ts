import { Middleware } from '@shared/presentation/protocols/middleware'

import { IsAdminMiddleware } from '../middlewares/is-admin-middleware'
import { ValidateTokenUseCase } from '../use-cases/validate-token'
import { makeJWTAdapter } from './make-jwt-adapter'

export const makeIsAdminMiddleware = (): Middleware => {
  const jwtAdapter = makeJWTAdapter()

  const validateTokenUseCase = new ValidateTokenUseCase(jwtAdapter)

  return new IsAdminMiddleware(validateTokenUseCase)
}
