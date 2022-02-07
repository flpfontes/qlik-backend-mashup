import { SpaceRepository } from '@modules/space/repository/prisma/space'
import {
  noContent,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

type Request = {
  id:string
}

export class DeleteSpaceController implements Controller {
  constructor (
    private readonly spaceRepository: SpaceRepository
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const { id } = request

      await this.spaceRepository.delete({ id })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
