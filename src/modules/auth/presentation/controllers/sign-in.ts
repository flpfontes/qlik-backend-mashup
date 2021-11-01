import { SignInByQlikId } from '@modules/auth/use-cases/contracts/sign-in-by-qlik-id'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Validation } from '@shared/presentation/protocols/validation'

export class SignInByQlikIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly signInyQlikId: SignInByQlikId
  ) {}

  async handle (request: SignInByQlikId.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { idQlik } = request

      const userOrError = await this.signInyQlikId.execute({ idQlik })

      if (userOrError.isLeft()) {
        return forbidden(userOrError.value)
      }
      return ok(userOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
