import { PanelModel } from '../model/panel'

export interface GetPanelByVisionIdRepository {
  getByGroupId: (params: GetPanelByVisionIdRepository.Params) => Promise<GetPanelByVisionIdRepository.Result>;
}

export namespace GetPanelByVisionIdRepository {
  export type Params = {
    visionId:string
  };
  export type Result = PanelModel[];
}
