import { CreateSpace } from '@modules/space/use-cases/contracts/create-space'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Validation } from '@shared/presentation/protocols/validation'

export class CreateSpaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createSpaceUseCase: CreateSpace
  ) {}

  async handle (request: CreateSpace.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name } = request

      const spaceOrError = await this.createSpaceUseCase.execute({ name })

      if (spaceOrError.isLeft()) {
        return forbidden(spaceOrError.value)
      }
      return ok(spaceOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
