import { UserRepository } from '@modules/user/repository/prisma/user'
import { Controller } from '@shared/presentation/protocols/controller'

import { SignInByQlikIdController } from '../presentation/controllers/sign-in'
import { SignInByQlikIdUseCase } from '../use-cases/sign-in-by-qlik-id'
import { makeJWTAdapter } from './make-jwt-adapter'
import { makeSignInByQlikIdValidation } from './make-sign-in-by-qlik-id-validation'

export const makeSignInByQlikIdController = (): Controller => {
  const userRepository = new UserRepository()

  const jwtAdapter = makeJWTAdapter()

  const signInByQlikIdUseCase = new SignInByQlikIdUseCase(userRepository, jwtAdapter)
  const validation = makeSignInByQlikIdValidation()
  const controller = new SignInByQlikIdController(validation, signInByQlikIdUseCase)
  return controller
}
