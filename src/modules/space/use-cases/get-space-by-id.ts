
import { SpaceRepository } from '../repository/prisma/space'
import { GetSpaceById } from './contracts/get-space-by-id'

export class GetSpaceByIdUseCase implements GetSpaceById {
  constructor (
    private readonly spaceRepository: SpaceRepository
  ) {}

  async execute (params: GetSpaceById.Params): Promise<GetSpaceById.Result> {
    const { spaceId } = params

    const space = await this.spaceRepository.getById({ spaceId })

    return space
  }
}
