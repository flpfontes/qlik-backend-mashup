export class GroupAlreadyExistInsideSpace extends Error {
  constructor () {
    super('O grupo ja existe dentro desse espaço.')
    this.name = 'GroupAlreadyExistInsideSpace'
  }
}
