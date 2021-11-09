import { UserModel } from '../model/user'

export interface GetAllUsersRepository {
  getAll: () => Promise<GetAllUsersRepository.Result>;
}

export namespace GetAllUsersRepository {

  export type Result = UserModel[];
}
