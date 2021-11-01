import { UserModel } from '../model/user'

export interface GetUserByIdQlikRepository {
  getByIdQlik: (params: GetUserByIdQlikRepository.Params) => Promise<GetUserByIdQlikRepository.Result>;
}

export namespace GetUserByIdQlikRepository {
  export type Params = {
    idQlik: string;
  };
  export type Result = UserModel;
}
