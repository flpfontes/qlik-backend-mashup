import { UserModel } from '../model/user'

export interface CreateUserRepository {
  create: (params: CreateUserRepository.Params) => Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Params = Omit<UserModel, 'id'>;

  export type Result = UserModel;
}
