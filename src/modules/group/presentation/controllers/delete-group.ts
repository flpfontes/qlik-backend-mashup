import { GroupRepository } from '@modules/group/repository/prisma/group'
import {
  noContent,
  serverError
} from '@shared/presentation/helpers/http'
import { Controller } from '@shared/presentation/protocols/controller'
import { HttpResponse } from '@shared/presentation/protocols/http'

type Params = {
  id:string
}

export class DeleteGroupController implements Controller {
  constructor (
    private readonly groupRepository: GroupRepository
  ) {}

  async handle (request: Params): Promise<HttpResponse> {
    try {
      const { id } = request

      await this.groupRepository.delete({ id })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
