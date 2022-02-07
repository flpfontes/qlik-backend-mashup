import { GroupAlreadyExistInsideSpace } from '@modules/group/presentation/errors/group-already-exist-in-space'
import { GroupModel } from '@modules/group/repository/model/group'
import { Either } from '@shared/presentation/errors/either'

export interface EditGroup {
  execute: (params: EditGroup.Params) => Promise<EditGroup.Result>;
}

export namespace EditGroup {
  export type Params = {
    id:string
    spaceId:string
    name: string;
  };
  export type Result = Either<GroupAlreadyExistInsideSpace, GroupModel>;
}
