import { GetSpacesAppsSheetsQlikUseCase } from '@modules/qlik/use-cases/get-spaces-apps-sheets-qlik'
import {
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetSpacesAppsSheetsQlikController implements Controller {
  constructor (
    private readonly getSpacesAppsSheetsQlikUseCase: GetSpacesAppsSheetsQlikUseCase
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const tree = await this.getSpacesAppsSheetsQlikUseCase.execute()

      return ok(tree)
    } catch (error) {
      return serverError(error)
    }
  }
}
