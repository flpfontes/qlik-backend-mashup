import { SpaceModel } from '../model/space'

export interface EditSpaceRepository {
  edit: (params: EditSpaceRepository.Params) => Promise<EditSpaceRepository.Result>;
}

export namespace EditSpaceRepository {
  export type Params = {
    id: string;
    name: string;
    slug:string
  };
  export type Result = SpaceModel;
}
