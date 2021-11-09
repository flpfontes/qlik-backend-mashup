import { SpaceModel } from '@modules/space/repository/model/space'

export interface GetSpaceById {
  execute: (params: GetSpaceById.Params) => Promise<GetSpaceById.Result>;
}

export namespace GetSpaceById {
  export type Params = {
    spaceId: string;
  };
  export type Result = SpaceModel;
}
