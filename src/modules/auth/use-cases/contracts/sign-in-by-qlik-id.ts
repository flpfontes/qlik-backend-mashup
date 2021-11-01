import { Either } from '@shared/presentation/errors/either'

import { UserDoesNotHaveValidLicenseError } from '../../presentation/errors/user-does-not-have-valid-license'
import { UserNotExistError } from '../../presentation/errors/user-not-exist'
import { User } from '.prisma/client'

export interface SignInByQlikId {
  execute: (params: SignInByQlikId.Params) => Promise<SignInByQlikId.Result>;
}

export namespace SignInByQlikId {
  export type Params = {
    idQlik: string;
  };

  type ResultToken = {
    user:Omit<User, 'id'>
    token:string
  }

  export type Result = Either<UserNotExistError | UserDoesNotHaveValidLicenseError, ResultToken>;
}

// Usuario nao possui uma licença valida
// Usuario não existe
