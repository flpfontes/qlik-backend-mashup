import { UserModel } from '../model/user'

export interface GetUserNotInIdsRepository {
  getNotInIds: (params: GetUserNotInIdsRepository.Params) => Promise<GetUserNotInIdsRepository.Result>;
}

export namespace GetUserNotInIdsRepository {
  export type Params = {
    ids: string[];
  };
  export type Result = UserModel[];
}
