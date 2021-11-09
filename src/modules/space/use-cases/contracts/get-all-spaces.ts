import { SpaceModel } from '@modules/space/repository/model/space'

export interface GetAllSpaces {
  execute: () => Promise<GetAllSpaces.Result>;
}

export namespace GetAllSpaces {

  export type Result = SpaceModel[];
}
