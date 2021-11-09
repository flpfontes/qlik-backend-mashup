import { CreateGroup } from '@modules/group/use-cases/contracts/create-group'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'
import { Validation } from '@shared/presentation/protocols/validation'

export class CreateGroupController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createGroupUseCase: CreateGroup
  ) {}

  async handle (request: CreateGroup.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, spaceId } = request

      const groupOrError = await this.createGroupUseCase.execute({ name, spaceId })

      if (groupOrError.isLeft()) {
        return forbidden(groupOrError.value)
      }
      return ok(groupOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
