import env from '@main/config/env'

import { AbstractJWT } from '../adapters/jwt/contracts/abstract-jwt'
import { JWTAdapter } from '../adapters/jwt/jwt'

export const makeJWTAdapter = (): AbstractJWT => {
  const jwtAdapter = new JWTAdapter(
    env.secretToken,
    env.expiresToken)

  return jwtAdapter
}
