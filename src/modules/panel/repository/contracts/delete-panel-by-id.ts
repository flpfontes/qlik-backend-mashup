
export interface DeletePanelByIdRepository {
  deleteById: (params: DeletePanelByIdRepository.Params) => Promise<DeletePanelByIdRepository.Result>;
}

export namespace DeletePanelByIdRepository {
  export type Params = {
    id:string
  };
  export type Result = void
}
