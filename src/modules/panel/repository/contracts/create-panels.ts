import { PanelModel } from '@modules/panel/repository/model/panel'

export interface CreatePanelsRepository {
  create: (params: CreatePanelsRepository.Params) => Promise<CreatePanelsRepository.Result>;
}

export namespace CreatePanelsRepository {
  export type Params = {
    visionId: string
    panels:PanelModel[]
  };
  export type Result = PanelModel[]
}
