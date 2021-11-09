export class SpaceInvalid extends Error {
  constructor () {
    super('Espaço invalido')
    this.name = 'SpaceInvalid'
  }
}
