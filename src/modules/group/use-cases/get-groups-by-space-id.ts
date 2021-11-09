import { GroupRepository } from '../repository/prisma/space'
import { GetGroupsBySpaceId } from './contracts/get-groups-by-space-id'

export class GetGroupsBySpaceIdUseCase implements GetGroupsBySpaceId {
  constructor (
    private readonly groupRepository: GroupRepository
  ) {}

  async execute (params: GetGroupsBySpaceId.Params): Promise<GetGroupsBySpaceId.Result> {
    const { spaceId, isAdmin, userId } = params
    let spaces = []

    if (isAdmin) {
      spaces = await this.groupRepository.getGroups({ spaceId })
    } else {
      spaces = await this.groupRepository.getByUserIdAndSpaceId({ spaceId, userId })
    }

    return spaces
  }
}
