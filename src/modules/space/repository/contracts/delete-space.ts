
export interface DeleteSpaceRepository {
  delete: (params: DeleteSpaceRepository.Params) => Promise<DeleteSpaceRepository.Result>;
}

export namespace DeleteSpaceRepository {
  export type Params = {
    id: string;
  };
  export type Result = void;
}
