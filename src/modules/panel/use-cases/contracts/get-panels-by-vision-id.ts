import { PanelModel } from '@modules/panel/repository/model/panel'

export interface GetPanelsByVisionId {
  execute: (params: GetPanelsByVisionId.Params) => Promise<GetPanelsByVisionId.Result>;
}

export namespace GetPanelsByVisionId {
  export type Params = {
    id: string;
  };
  export type Result = PanelModel[]
}
