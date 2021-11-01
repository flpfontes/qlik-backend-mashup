export class UserNotExistError extends Error {
  constructor () {
    super('User not exist')
    this.name = 'UserNotExistError'
  }
}
