import { GetObjects } from '@modules/qlik/use-cases/contracts/get-objects'
import {
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

export class GetObjectsBySheetIdController implements Controller {
  constructor (
    private readonly getObjectsUseCase: GetObjects
  ) {}

  async handle (request:GetObjects.Params): Promise<HttpResponse> {
    try {
      const { sheetURL, resourceId } = request

      const objects = await this.getObjectsUseCase.execute({ sheetURL, resourceId })

      return ok(objects)
    } catch (error) {
      return serverError(error)
    }
  }
}
