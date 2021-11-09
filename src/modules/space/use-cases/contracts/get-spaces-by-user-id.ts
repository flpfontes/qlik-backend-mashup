import { SpaceModel } from '@modules/space/repository/model/space'

export interface GetSpacesByUserId {
  execute: (params: GetSpacesByUserId.Params) => Promise<GetSpacesByUserId.Result>;
}

export namespace GetSpacesByUserId {
  export type Params = {
    userId: string;
    isAdmin:boolean
  };
  export type Result = SpaceModel[];
}
