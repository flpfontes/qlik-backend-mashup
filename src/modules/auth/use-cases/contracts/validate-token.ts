import { Either } from '@shared/presentation/errors/either'

export interface ValidateToken {
  execute: (user: ValidateToken.Params) => Promise<ValidateToken.Result>;
}

export namespace ValidateToken {
  export type Params = {
    accessToken: string;
  };

  type ResultValidateToken ={
    userId: string;
    isAdmin:boolean
  }

  export type Result = Either<null, ResultValidateToken>
}
