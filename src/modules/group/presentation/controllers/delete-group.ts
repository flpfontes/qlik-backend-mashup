import { EditGroup } from '@modules/group/use-cases/contracts/edit-group'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Validation } from '@shared/presentation/protocols/validation'

export class EditGroupController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly editGroupUseCase: EditGroup
  ) {}

  async handle (request: EditGroup.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, spaceId, id } = request

      const groupOrError = await this.editGroupUseCase.execute({ name, spaceId, id })

      if (groupOrError.isLeft()) {
        return forbidden(groupOrError.value)
      }
      return ok(groupOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
