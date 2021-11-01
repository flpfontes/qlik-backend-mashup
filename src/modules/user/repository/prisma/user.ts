import { prisma } from '@shared/infra/prisma/prisma'

import { GetUserByIdQlikRepository } from '../contracts/get-user-by-id-qlik'

export class UserRepository implements GetUserByIdQlikRepository {
  async getByIdQlik (params: GetUserByIdQlikRepository.Params): Promise<GetUserByIdQlikRepository.Result> {
    const { idQlik } = params

    const user = await prisma.user.findFirst({
      where: {
        idQlik
      }
    })

    return user
  }
}
