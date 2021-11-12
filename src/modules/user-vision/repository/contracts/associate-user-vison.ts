import { UserVisionModel } from '@modules/user-vision/repository/model/user-vision'

export interface AssociateUserVisionRepository {
  associateUserVision: (params: AssociateUserVisionRepository .Params) => Promise<AssociateUserVisionRepository .Result>;
}

export namespace AssociateUserVisionRepository {
  export type Params = {
    userId:string;
    visionId: string;
  };
  export type Result = UserVisionModel
}
