import { SpaceModel } from '../model/space'

export interface GetAllSpacesRepository {
  getSpaces: () => Promise<GetAllSpacesRepository.Result>;
}

export namespace GetAllSpacesRepository {

  export type Result = SpaceModel[];
}
