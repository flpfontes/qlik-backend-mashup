import { VisionModel } from '@modules/vision/repository/model/vision'

import { GroupModel } from '../model/group'

export interface GetGroupsBySpaceIdRepository {
  getGroups: (params:GetGroupsBySpaceIdRepository.Params) => Promise<GetGroupsBySpaceIdRepository.Result>;
}

export namespace GetGroupsBySpaceIdRepository {
  export type Params = {
    spaceId:string
  }

  export type Result = (GroupModel & {
    visions: VisionModel[];
})[]
}
