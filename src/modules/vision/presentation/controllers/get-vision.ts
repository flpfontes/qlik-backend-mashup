
import { GetVisionByIdRepository } from '@modules/vision/repository/contracts/get-vision-by-id'
import {
  ok,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

type Request = {
  visionId:string
}

export class GetVisionController implements Controller {
  constructor (
    private readonly getVisionByIdRepository: GetVisionByIdRepository
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const { visionId } = request
      const vision = await this.getVisionByIdRepository.getById({ visionId })

      return ok(vision)
    } catch (error) {
      return serverError(error)
    }
  }
}
