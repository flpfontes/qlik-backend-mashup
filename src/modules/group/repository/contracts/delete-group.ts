
export interface DeleteGroupRespository {
  delete: (params: DeleteGroupRespository.Params) => Promise<DeleteGroupRespository.Result>;
}

export namespace DeleteGroupRespository {
  export type Params = {
    id:string;
  };
  export type Result = void;
}
