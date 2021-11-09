import { left, right } from '@shared/presentation/errors/either'

import { AbstractJWT } from '../adapters/jwt/contracts/abstract-jwt'
import { ValidateToken } from './contracts/validate-token'

export class ValidateTokenUseCase implements ValidateToken {
  constructor (
    private readonly jwt: AbstractJWT
  ) {}

  async execute (params: ValidateToken.Params): Promise<ValidateToken.Result> {
    const [, token] = params.accessToken.split(' ')

    try {
      const { id, isAdmin } = this.jwt.check({ token })

      if (id) {
        return right({ userId: id, isAdmin })
      }
      return left(null)
    } catch (error) {
      return left(null)
    }
  }
}
