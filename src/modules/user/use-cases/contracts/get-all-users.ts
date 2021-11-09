import { UserModel } from '@modules/user/repository/model/user'

export interface GetAllUsers {
  execute: () => Promise<GetAllUsers.Result>;
}

export namespace GetAllUsers {

  export type Result = UserModel[];
}
