import { prisma } from '@shared/infra/prisma/prisma'

import { CreateGroupRespository } from '../contracts/create-group'
import { DeleteGroupRespository } from '../contracts/delete-group'
import { EditGroupRespository } from '../contracts/edit-group'
import { GetGroupBySlugAndSpaceIdRepository } from '../contracts/get-group-by-slug-and-space-id'
import { GetGroupsBySpaceIdRepository } from '../contracts/get-groups-by-space-id'
import { GetGroupsByUserIdAndSpaceIdRepository } from '../contracts/get-groups-by-user-id-and-space-id'

export class GroupRepository implements CreateGroupRespository, GetGroupBySlugAndSpaceIdRepository, GetGroupsBySpaceIdRepository, GetGroupsByUserIdAndSpaceIdRepository, EditGroupRespository, DeleteGroupRespository {
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
      },
      orderBy: {
        name: 'asc'
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
      },
      orderBy: {
        name: 'asc'
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
          some: {
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
      },
      orderBy: {
        name: 'asc'
      },
      include: {
        space: false,
        visions: true
      }
    })

    return groups
  }

  async edit (params: EditGroupRespository.Params) : Promise<EditGroupRespository.Result> {
    const { id, name, slug } = params

    const group = await prisma.group.update({
      where: {
        id
      },
      data: {
        slug,
        name
      }
    })

    return group
  }
}
