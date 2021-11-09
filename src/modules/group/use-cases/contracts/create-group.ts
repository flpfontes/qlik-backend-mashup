import { GroupAlreadyExistInsideSpace } from '@modules/group/presentation/errors/group-already-exist-in-space'
import { GroupModel } from '@modules/group/repository/model/group'
import { Either } from '@shared/presentation/errors/either'

export interface CreateGroup {
  execute: (params: CreateGroup.Params) => Promise<CreateGroup.Result>;
}

export namespace CreateGroup {
  export type Params = {
    spaceId:string
    name: string;
  };
  export type Result = Either<GroupAlreadyExistInsideSpace, GroupModel>;
}
