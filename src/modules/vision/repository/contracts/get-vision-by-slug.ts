import { VisionModel } from '../model/vision'

export interface GetVisionBySlugRepository {
  getBySlugAndGroupId: (params: GetVisionBySlugRepository.Params) => Promise<GetVisionBySlugRepository.Result>;
}

export namespace GetVisionBySlugRepository {
  export type Params = {
    groupId:string
    slug:string
  }
  export type Result = VisionModel
}
