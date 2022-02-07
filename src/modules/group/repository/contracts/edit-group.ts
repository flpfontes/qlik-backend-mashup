import { GroupModel } from '../model/group'

export interface EditGroupRespository {
  edit: (params: EditGroupRespository.Params) => Promise<EditGroupRespository.Result>;
}

export namespace EditGroupRespository {
  export type Params = {
    id:string;
    name: string;
    slug:string
  };
  export type Result = GroupModel;
}
