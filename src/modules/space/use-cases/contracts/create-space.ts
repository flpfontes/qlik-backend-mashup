import { SpaceAlreadyExistError } from '@modules/space/presentation/errors/space-already-exist'
import { SpaceModel } from '@modules/space/repository/model/space'
import { Either } from '@shared/presentation/errors/either'

export interface CreateSpace {
  execute: (params: CreateSpace.Params) => Promise<CreateSpace.Result>;
}

export namespace CreateSpace {
  export type Params = {
    name: string;
  };
  export type Result = Either<SpaceAlreadyExistError, SpaceModel>;
}
