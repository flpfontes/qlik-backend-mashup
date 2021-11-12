/* eslint-disable camelcase */

export interface GetRelatedUsersByVisonIdRepository {
  relatedUsersByVisonId: (params: GetRelatedUsersByVisonIdRepository.Params) => Promise<GetRelatedUsersByVisonIdRepository.Result>;
}

export namespace GetRelatedUsersByVisonIdRepository {
  export type Params = {
    visionId:string
  }

  export type Result = {
    user_id:string;
    user_name:string;
    vision_id:string;
  }[];
}
