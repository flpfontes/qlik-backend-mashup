import { CheckToken } from './check-token'
import { CreateToken } from './create-token'

export abstract class AbstractJWT implements CreateToken, CheckToken {
  abstract create(params: CreateToken.Params): CreateToken.Result;

  abstract check(params:CheckToken.Params): string;
}
