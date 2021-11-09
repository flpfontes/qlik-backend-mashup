import { SpaceModel } from '../model/space'

export interface GetSpaceByIdRepository {
  getById: (params: GetSpaceByIdRepository.Params) => Promise<GetSpaceByIdRepository.Result>;
}

export namespace GetSpaceByIdRepository {
  export type Params = {
    spaceId:string
  };
  export type Result = SpaceModel;
}
