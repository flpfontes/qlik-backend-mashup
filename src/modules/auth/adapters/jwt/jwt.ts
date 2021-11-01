import jwt from 'jsonwebtoken'

import { CheckToken } from './contracts/check-token'
import { CreateToken } from './contracts/create-token'

interface IPayload {
  sub: string;
}

export class JWTAdapter implements CreateToken, CheckToken {
  constructor (
    private readonly secretToken: string,
    private readonly expiresIn: string
  ) {}

  create (params: CreateToken.Params): CreateToken.Result {
    const token = jwt.sign({}, this.secretToken, {
      subject: params.id,
      expiresIn: this.expiresIn
    })

    return {
      token
    }
  }

  check (params: CheckToken.Params): string {
    const { sub } = jwt.verify(params.token, this.secretToken) as IPayload
    return sub
  }
}
