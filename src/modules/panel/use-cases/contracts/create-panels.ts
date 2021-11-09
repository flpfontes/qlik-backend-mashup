import { PanelModel } from '@modules/panel/repository/model/panel'

export interface CreatePanels {
  execute: (params: CreatePanels.Params) => Promise<CreatePanels.Result>;
}

export namespace CreatePanels {
  export type Params = {
    visionId:string
    panels:PanelModel[]
  };
  export type Result = PanelModel[]
}
