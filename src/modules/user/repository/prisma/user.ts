import { prisma } from '@shared/infra/prisma/prisma'

import { CreateUserRepository } from '../contracts/create-user'
import { GetAllUsersRepository } from '../contracts/get-all-user'
import { GetUserByIdQlikRepository } from '../contracts/get-user-by-id-qlik'
import { UpdateUserByIdRepository } from '../contracts/update-user-by-id'

export class UserRepository implements GetUserByIdQlikRepository, GetAllUsersRepository, CreateUserRepository, UpdateUserByIdRepository {
  async getByIdQlik (params: GetUserByIdQlikRepository.Params): Promise<GetUserByIdQlikRepository.Result> {
    const { idQlik } = params

    const user = await prisma.user.findFirst({
      where: {
        idQlik
      }
    })

    return user
  }

  async getAll ():Promise<GetAllUsersRepository.Result> {
    const users = await prisma.user.findMany({})

    return users
  }

  async create (params:CreateUserRepository.Params):Promise<CreateUserRepository.Result> {
    const { idQlik, email, isAdmin, licenseQlik, name } = params

    const user = await prisma.user.create({
      data: {
        idQlik, email, isAdmin, licenseQlik, name
      }
    })

    return user
  }

  async update (params:UpdateUserByIdRepository.Params):Promise<UpdateUserByIdRepository.Result> {
    const { id, name, email, idQlik, isAdmin, licenseQlik } = params

    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name, email, idQlik, isAdmin, licenseQlik
      }
    })

    return user
  }
}
