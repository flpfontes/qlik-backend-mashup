export class SpaceAlreadyExistError extends Error {
  constructor () {
    super('Já existe um espaço com esse nome.')
    this.name = 'SpaceAlreadyExistError'
  }
}
