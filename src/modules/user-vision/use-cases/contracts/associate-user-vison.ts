import { UserVisionModel } from '@modules/user-vision/repository/model/user-vision'

export interface AssociateUserVision {
  execute: (params: AssociateUserVision.Params) => Promise<AssociateUserVision.Result>;
}

export namespace AssociateUserVision {
  export type Params = {
    userId:string;
    visionId: string;
  };
  export type Result = UserVisionModel
}
