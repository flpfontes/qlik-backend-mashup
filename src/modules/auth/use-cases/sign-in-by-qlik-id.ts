import { licenseQlikEnum } from '@modules/user/repository/model/license-qlik'
import { left, right } from '@shared/presentation/errors/either'
import { UserRepository } from 'src/modules/user/repository/prisma/user'

import { CreateToken } from '../adapters/jwt/contracts/create-token'
import { UserDoesNotHaveValidLicenseError } from '../presentation/errors/user-does-not-have-valid-license'
import { UserNotExistError } from '../presentation/errors/user-not-exist'
import { SignInByQlikId } from './contracts/sign-in-by-qlik-id'

export class SignInByQlikIdUseCase implements SignInByQlikId {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtAdapter: CreateToken
  ) {}

  async execute (params: SignInByQlikId.Params): Promise<SignInByQlikId.Result> {
    const { idQlik } = params

    const user = await this.userRepository.getByIdQlik({ idQlik })

    if (!user) {
      return left(new UserNotExistError())
    }

    if (Object.values(licenseQlikEnum).indexOf(user.licenseQlik) === -1) {
      return left(new UserDoesNotHaveValidLicenseError())
    }

    const { id, email, isAdmin, licenseQlik, name } = user

    const { token } = this.jwtAdapter.create({ id, email })

    return right({
      user: {
        email,
        idQlik,
        isAdmin,
        licenseQlik,
        name
      },
      token
    })
  }
}
