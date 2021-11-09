import { Middleware } from '@shared/presentation/protocols/middleware'

import { AuthMiddleware } from '../middlewares/auth-middleware'
import { ValidateTokenUseCase } from '../use-cases/validate-token'
import { makeJWTAdapter } from './make-jwt-adapter'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = makeJWTAdapter()

  const validateTokenUseCase = new ValidateTokenUseCase(jwtAdapter)

  return new AuthMiddleware(validateTokenUseCase)
}
