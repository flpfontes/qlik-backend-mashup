import { GroupModel } from '../model/group'

export interface GetGroupBySlugAndSpaceIdRepository {
  getBySlugAndSpaceId: (params: GetGroupBySlugAndSpaceIdRepository.Params) => Promise<GetGroupBySlugAndSpaceIdRepository.Result>;
}

export namespace GetGroupBySlugAndSpaceIdRepository {
  export type Params = {
    spaceId:string
    slug:string
  };
  export type Result = GroupModel;
}
