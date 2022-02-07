import { EditSpace } from '@modules/space/use-cases/contracts/edit-space'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Validation } from '@shared/presentation/protocols/validation'

export class EditSpaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly editSpaceUseCase: EditSpace
  ) {}

  async handle (request: EditSpace.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { id, name } = request

      const spaceOrError = await this.editSpaceUseCase.execute({ id, name })

      if (spaceOrError.isLeft()) {
        return forbidden(spaceOrError.value)
      }
      return ok(spaceOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
