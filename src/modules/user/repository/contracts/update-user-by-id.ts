import { UserModel } from '../model/user'

export interface UpdateUserByIdRepository {
  update: (params: UpdateUserByIdRepository.Params) => Promise<UpdateUserByIdRepository.Result>;
}

export namespace UpdateUserByIdRepository {
  export type Params = UserModel;

  export type Result = UserModel;
}
