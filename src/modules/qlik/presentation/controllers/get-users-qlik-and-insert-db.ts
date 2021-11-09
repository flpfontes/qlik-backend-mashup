import { GetUsersQlikAndInsertDb } from '@modules/qlik/use-cases/contracts/get-users-qlik-and-insert-db'
import {
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetUsersQikAndInsertDbController implements Controller {
  constructor (
    private readonly getUsersQikAndInsertDbUseCase: GetUsersQlikAndInsertDb
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const users = await this.getUsersQikAndInsertDbUseCase.execute()

      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
