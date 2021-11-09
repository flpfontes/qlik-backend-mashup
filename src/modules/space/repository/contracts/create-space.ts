import { SpaceModel } from '../model/space'

export interface CreateSpaceRepository {
  create: (params: CreateSpaceRepository.Params) => Promise<CreateSpaceRepository.Result>;
}

export namespace CreateSpaceRepository {
  export type Params = {
    name: string;
    slug:string
  };
  export type Result = SpaceModel;
}
