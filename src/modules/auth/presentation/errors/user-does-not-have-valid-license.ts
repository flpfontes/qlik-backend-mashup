export class UserDoesNotHaveValidLicenseError extends Error {
  constructor () {
    super('User does not have a valid license')
    this.name = 'UserDoesNotHaveValidLicenseError'
  }
}
