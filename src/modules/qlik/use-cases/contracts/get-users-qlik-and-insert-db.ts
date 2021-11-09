import { UserModel } from '@modules/user/repository/model/user'

export interface GetUsersQlikAndInsertDb {
  execute:() => Promise<GetUsersQlikAndInsertDb.Result>;
}

export namespace GetUsersQlikAndInsertDb {

  export type Result = UserModel[];
}
