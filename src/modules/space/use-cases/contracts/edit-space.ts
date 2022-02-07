import { SpaceAlreadyExistError } from '@modules/space/presentation/errors/space-already-exist'
import { SpaceModel } from '@modules/space/repository/model/space'
import { Either } from '@shared/presentation/errors/either'

export interface EditSpace {
  execute: (params: EditSpace.Params) => Promise<EditSpace.Result>;
}

export namespace EditSpace {
  export type Params = {
    id: string;
    name: string;
  };
  export type Result = Either<SpaceAlreadyExistError, SpaceModel>;
}
