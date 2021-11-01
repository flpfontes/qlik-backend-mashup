import { left } from '@shared/presentation/errors/either'
import { UserRepository } from 'src/modules/user/repository/prisma/user'

import { UserNotExistError } from '../presentation/errors/user-not-exist'
import { SignInByQlikId } from './contracts/sign-in-by-qlik-id'

export class SignInByQlikIdUseCase implements SignInByQlikId {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async execute (params: SignInByQlikId.Params): Promise<SignInByQlikId.Result> {
    const { idQlik } = params

    const user = this.userRepository.getByIdQlik({ idQlik })

    if (!user) {
      return left(new UserNotExistError())
    }

    if()
  }
}
