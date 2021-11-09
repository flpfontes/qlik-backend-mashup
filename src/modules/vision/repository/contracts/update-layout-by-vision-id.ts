import { VisionModel } from '../model/vision'

export interface UpdateLayoutByVisionIdRepository {
  updateLayoutByVisionId: (params: UpdateLayoutByVisionIdRepository.Params) => Promise<UpdateLayoutByVisionIdRepository.Result>;
}

export namespace UpdateLayoutByVisionIdRepository {
  export type Params = Omit<VisionModel, 'groupId' | 'name' | 'slug'>
  export type Result = VisionModel
}
