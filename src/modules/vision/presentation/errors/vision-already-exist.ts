export class VisionAlreadyExistError extends Error {
  constructor () {
    super('Já existe uma visão com esse nome nesse espaço')
    this.name = 'VisionAlreadyExistError'
  }
}
