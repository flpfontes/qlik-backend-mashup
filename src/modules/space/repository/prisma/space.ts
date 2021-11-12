import { prisma } from '@shared/infra/prisma/prisma'

import { CreateSpaceRepository } from '../contracts/create-space'
import { GetAllSpacesRepository } from '../contracts/get-all-spaces'
import { GetSpaceByIdRepository } from '../contracts/get-space-by-id'
import { GetSpaceBySlugRepository } from '../contracts/get-space-by-slug'
import { GetSpacesByUserIdRepository } from '../contracts/get-spaces-by-user-id'

export class SpaceRepository implements CreateSpaceRepository, GetSpaceBySlugRepository, GetSpacesByUserIdRepository, GetAllSpacesRepository, GetSpaceByIdRepository {
  async create (params: CreateSpaceRepository.Params): Promise<CreateSpaceRepository.Result> {
    const { name, slug } = params

    const space = await prisma.space.create({
      data: {
        name,
        slug
      }
    })

    return space
  }

  async getBySlug (params:GetSpaceBySlugRepository.Params): Promise<GetSpaceBySlugRepository.Result> {
    const { slug } = params

    const space = await prisma.space.findFirst({
      where: {
        slug
      },
      orderBy: {
        name: 'asc'
      }
    })

    return space
  }

  async getByUserId (params:GetSpacesByUserIdRepository.Params):Promise<GetSpacesByUserIdRepository.Result> {
    const { userId } = params

    const spaces = await prisma.space.findMany({
      where: {
        group: {
          some: {
            visions: {
              some: {
                userVisions: {
                  some: {
                    userId
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return spaces
  }

  async getSpaces ():Promise<GetAllSpacesRepository.Result> {
    const spaces = await prisma.space.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return spaces
  }

  async getById (params:GetSpaceByIdRepository.Params): Promise<GetSpaceByIdRepository.Result> {
    const { spaceId } = params
    const space = await prisma.space.findUnique({
      where: {
        id: spaceId
      }
    })

    return space
  }
}
