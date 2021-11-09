import { SpaceModel } from '../model/space'

export interface GetSpacesByUserIdRepository {
  getByUserId: (params: GetSpacesByUserIdRepository.Params) => Promise<GetSpacesByUserIdRepository.Result>;
}

export namespace GetSpacesByUserIdRepository {
  export type Params = {
    userId:string
  };
  export type Result = SpaceModel[];
}
