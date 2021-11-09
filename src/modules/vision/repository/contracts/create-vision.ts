import { VisionModel } from '@modules/vision/repository/model/vision'

export interface CreateVisionRepository {
  create: (params: CreateVisionRepository.Params) => Promise<CreateVisionRepository.Result>;
}

export namespace CreateVisionRepository {
  export type Params = {
    name:string;
    slug:string;
    groupId: string;
  }
  export type Result = VisionModel
}
