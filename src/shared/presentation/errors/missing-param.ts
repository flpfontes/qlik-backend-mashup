export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} missing`)
    this.name = 'MissingParamError'
  }
}
