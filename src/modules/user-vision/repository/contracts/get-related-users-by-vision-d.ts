
import { UserVision } from '.prisma/client'

export interface GetRelatedUsersByVisonIdRepository {
  relatedUsersByVisonId: (params: GetRelatedUsersByVisonIdRepository.Params) => Promise<GetRelatedUsersByVisonIdRepository.Result>;
}

export namespace GetRelatedUsersByVisonIdRepository {
  export type Params = {
    visionId:string
  }

  export type Result = UserVision[]
}
