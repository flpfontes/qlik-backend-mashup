import { UserModel } from '../model/user'

export interface GetUsersByVisionIdRepository {
  getUsersByVisionId: (params: GetUsersByVisionIdRepository.Params) => Promise<GetUsersByVisionIdRepository.Result>;
}

export namespace GetUsersByVisionIdRepository {
  export type Params = {
    visionId: string;
  };
  export type Result = UserModel[]
}
