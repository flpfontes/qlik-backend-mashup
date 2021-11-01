import { Either } from '@shared/presentation/errors/either'
import { UserModel } from 'src/modules/user/repository/model/user'

import { UserDoesNotHaveValidLicenseError } from '../../presentation/errors/user-does-not-have-valid-license'
import { UserNotExistError } from '../../presentation/errors/user-not-exist'

export interface SignInByQlikId {
  execute: (params: SignInByQlikId.Params) => Promise<SignInByQlikId.Result>;
}

export namespace SignInByQlikId {
  export type Params = {
    idQlik: string;
  };

  export type Result = Either<UserNotExistError | UserDoesNotHaveValidLicenseError, UserModel>;
}

// Usuario nao possui uma licença valida
// Usuario não existe
