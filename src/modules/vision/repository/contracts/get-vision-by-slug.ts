import { VisionModel } from '../model/vision'

export interface GetVisionBySlugRepository {
  getBySlug: (params: GetVisionBySlugRepository.Params) => Promise<GetVisionBySlugRepository.Result>;
}

export namespace GetVisionBySlugRepository {
  export type Params = {
    slug:string
  }
  export type Result = VisionModel
}
