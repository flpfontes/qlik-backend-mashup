
import { UserRepository } from '../repository/prisma/user'
import { GetAllUsers } from './contracts/get-all-users'

export class GetAllUsersUseCase implements GetAllUsers {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async execute (): Promise<GetAllUsers.Result> {
    const users = await this.userRepository.getAll()

    return users
  }
}
