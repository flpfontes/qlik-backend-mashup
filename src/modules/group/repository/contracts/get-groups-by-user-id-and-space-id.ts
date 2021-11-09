import { GroupModel } from '../model/group'

export interface GetGroupsByUserIdAndSpaceIdRepository {
  getByUserIdAndSpaceId: (params: GetGroupsByUserIdAndSpaceIdRepository.Params) => Promise<GetGroupsByUserIdAndSpaceIdRepository.Result>;
}

export namespace GetGroupsByUserIdAndSpaceIdRepository {
  export type Params = {
    spaceId:string
    userId:string
  };
  export type Result = GroupModel[];
}
