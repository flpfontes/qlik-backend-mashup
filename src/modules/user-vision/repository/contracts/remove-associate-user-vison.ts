
export interface RemoveAssociateUserVisionRepository {
  removeAssociateUserVision: (params: RemoveAssociateUserVisionRepository .Params) => Promise<RemoveAssociateUserVisionRepository .Result>;
}

export namespace RemoveAssociateUserVisionRepository {
  export type Params = {
    userId:string;
    visionId: string;
  };
  export type Result = void
}
