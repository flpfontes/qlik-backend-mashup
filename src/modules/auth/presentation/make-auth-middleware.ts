import env from '@main/config/env'
import { UserTokenRepository } from '@modules/user-token/repository/prisma/user-token'
import { Middleware } from '@shared/presentation/protocols/middleware'

import { JWTAdapter } from '../adapters/jwt/jwt'
import { AuthMiddleware } from '../middlewares/auth-middleware'
import { ValidateTokenUseCase } from '../use-cases/validate-token'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JWTAdapter(
    env.secret_token,
    env.expires_token)

  const userTokenRepository = new UserTokenRepository()

  const validateTokenUseCase = new ValidateTokenUseCase(jwtAdapter, userTokenRepository)

  return new AuthMiddleware(validateTokenUseCase)
}
