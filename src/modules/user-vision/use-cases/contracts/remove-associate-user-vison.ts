
export interface RemoveAssociateUserVision {
  execute: (params: RemoveAssociateUserVision.Params) => Promise<RemoveAssociateUserVision.Result>;
}

export namespace RemoveAssociateUserVision {
  export type Params = {
    userId:string;
    visionId: string;
  };
  export type Result = void
}
