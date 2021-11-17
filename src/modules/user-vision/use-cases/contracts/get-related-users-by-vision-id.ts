/* eslint-disable camelcase */

export interface GetRelatedUsersByVisionId {
  execute: (params: GetRelatedUsersByVisionId.Params) => Promise<GetRelatedUsersByVisionId.Result>;
}

export namespace GetRelatedUsersByVisionId {
  export type Params = {
    visionId: string;
  };
  export type Result = {
    userId: string;
    userName: string;
    visionId: string;
}[]
}
