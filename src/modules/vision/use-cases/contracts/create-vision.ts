import { VisionAlreadyExistError } from '@modules/vision/presentation/errors/vision-already-exist'
import { VisionModel } from '@modules/vision/repository/model/vision'
import { Either } from '@shared/presentation/errors/either'

export interface CreateVision {
  execute: (params: CreateVision.Params) => Promise<CreateVision.Result>;
}

export namespace CreateVision {
  export type Params = {
    userId:string;
    name:string;
    groupId: string;
  }
  export type Result = Either<VisionAlreadyExistError, VisionModel>
}
