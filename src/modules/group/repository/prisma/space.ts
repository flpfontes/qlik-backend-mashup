import { prisma } from '@shared/infra/prisma/prisma'

import { CreateGroupRespository } from '../contracts/create-group'
import { GetGroupBySlugAndSpaceIdRepository } from '../contracts/get-group-by-slug-and-space-id'
import { GetGroupsBySpaceIdRepository } from '../contracts/get-groups-by-space-id'
import { GetGroupsByUserIdAndSpaceIdRepository } from '../contracts/get-groups-by-user-id-and-space-id'

export class GroupRepository implements CreateGroupRespository, GetGroupBySlugAndSpaceIdRepository, GetGroupsBySpaceIdRepository, GetGroupsByUserIdAndSpaceIdRepository {
  async create (params: CreateGroupRespository.Params): Promise<CreateGroupRespository.Result> {
    const { name, slug, spaceId } = params

    const group = await prisma.group.create({
      data: {
        name,
        slug,
        space: {
          connect: {
            id: spaceId
          }
        }
      }
    })

    return group
  }

  async getBySlugAndSpaceId (params: GetGroupBySlugAndSpaceIdRepository.Params): Promise<GetGroupBySlugAndSpaceIdRepository.Result> {
    const { slug, spaceId } = params

    const space = await prisma.group.findFirst({
      where: {
        slug,
        spaceId
      }
    })

    return space
  }

  async getGroups (params:GetGroupsBySpaceIdRepository.Params):Promise<GetGroupsBySpaceIdRepository.Result> {
    const { spaceId } = params
    const groups = await prisma.group.findMany({
      where: {
        spaceId
      },
      include: {
        space: false,
        visions: true
      }
    })

    return groups
  }

  async getByUserIdAndSpaceId (params:GetGroupsByUserIdAndSpaceIdRepository.Params): Promise<GetGroupsByUserIdAndSpaceIdRepository.Result> {
    const { spaceId, userId } = params

    const groups = await prisma.group.findMany({
      where: {
        spaceId,
        visions: {
          every: {
            panel: {
              some: {
                vision: {
                  userVisions: {
                    some: {
                      userId
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    return groups
  }
}
