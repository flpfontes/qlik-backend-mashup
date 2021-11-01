import { Validation } from '@shared/presentation/protocols/validation'
import { RequiredFieldValidation } from '@shared/validation/validators/required-field'
import { ValidationComposite } from '@shared/validation/validators/validation-composite'

export const makeSignInByQlikIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['idQlik']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
