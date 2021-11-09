
export interface DeletePanelById {
  execute: (params: DeletePanelById.Params) => Promise<DeletePanelById.Result>;
}

export namespace DeletePanelById {
  export type Params = {
    id:string
  };
  export type Result = void
}
