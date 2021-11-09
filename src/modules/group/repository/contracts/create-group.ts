import { GroupModel } from '../model/group'

export interface CreateGroupRespository {
  create: (params: CreateGroupRespository.Params) => Promise<CreateGroupRespository.Result>;
}

export namespace CreateGroupRespository {
  export type Params = {
    spaceId:string;
    name: string;
    slug:string
  };
  export type Result = GroupModel;
}
