
import { SpaceRepository } from '../repository/prisma/space'
import { GetSpacesByUserId } from './contracts/get-spaces-by-user-id'

export class GetSpacesByUserIdUseCase implements GetSpacesByUserId {
  constructor (
    private readonly spaceRepository: SpaceRepository
  ) {}

  async execute (params: GetSpacesByUserId.Params): Promise<GetSpacesByUserId.Result> {
    const { userId, isAdmin } = params

    let spaces = []

    if (!isAdmin) {
      spaces = await this.spaceRepository.getByUserId({ userId })
    } else {
      spaces = await this.spaceRepository.getSpaces()
    }

    return spaces
  }
}
