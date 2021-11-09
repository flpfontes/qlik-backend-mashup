import { SpaceModel } from '../model/space'

export interface GetSpaceBySlugRepository {
  getBySlug: (params: GetSpaceBySlugRepository.Params) => Promise<GetSpaceBySlugRepository.Result>;
}

export namespace GetSpaceBySlugRepository {
  export type Params = {
    slug:string
  };
  export type Result = SpaceModel;
}
