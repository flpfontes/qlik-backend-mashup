import { GroupModel } from '@modules/group/repository/model/group'
import { VisionModel } from '@modules/vision/repository/model/vision'

export interface GetGroupsBySpaceId {
  execute: (params: GetGroupsBySpaceId.Params) => Promise<GetGroupsBySpaceId.Result>;
}

export namespace GetGroupsBySpaceId {
  export type Params = {
    userId: string;
    isAdmin:boolean
    spaceId: string;
  };
  export type Result = (GroupModel & {
    visions: VisionModel[];
})[]
}
