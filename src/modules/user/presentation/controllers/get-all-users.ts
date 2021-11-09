
import { GetAllUsers } from '@modules/user/use-cases/contracts/get-all-users'
import {
  noContent,
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetAllUsersController implements Controller {
  constructor (
    private readonly getAllUsersUseCase: GetAllUsers
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const users = await this.getAllUsersUseCase.execute()

      if (users.length === 0) {
        return noContent()
      }
      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
