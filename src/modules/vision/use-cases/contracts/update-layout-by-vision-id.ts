import { VisionModel } from '@modules/vision/repository/model/vision'

export interface UpdateLayoutByVisionId {
  execute: (params: UpdateLayoutByVisionId.Params) => Promise<UpdateLayoutByVisionId.Result>;
}

export namespace UpdateLayoutByVisionId {
  export type Params = {
    id:string;
    layout:string
  }
  export type Result = VisionModel
}
