import { VisionModel } from '../model/vision'

export interface GetVisionByIdRepository {
  getById: (params: GetVisionByIdRepository.Params) => Promise<GetVisionByIdRepository.Result>;
}

export namespace GetVisionByIdRepository {
  export type Params = {
    visionId:string
  }
  export type Result = VisionModel
}
