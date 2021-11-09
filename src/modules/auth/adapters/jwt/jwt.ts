import jwt from 'jsonwebtoken'

import { AbstractJWT } from './contracts/abstract-jwt'
import { CheckToken } from './contracts/check-token'
import { CreateToken } from './contracts/create-token'

export class JWTAdapter extends AbstractJWT {
  constructor (
    private readonly secretToken: string,
    private readonly expiresIn: string) {
    super()
  }

  create (params: CreateToken.Params): CreateToken.Result {
    const token = jwt.sign({
      id: params.id,
      isAdmin: params.isAdmin
    }, this.secretToken, {
      expiresIn: this.expiresIn
    })

    return {
      token
    }
  }

  check (params: CheckToken.Params): CheckToken.Result {
    const checked = jwt.verify(params.token, this.secretToken) as CheckToken.Result
    return checked
  }
}
