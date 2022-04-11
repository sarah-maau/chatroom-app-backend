import { GenericError } from '../../domain/GenericError'
import HttpStatus from 'http-status-codes'

export class ProviderErrors {
  static EntityNotFound(entityName: string): GenericError {
    return GenericError.of({
      statusCode: HttpStatus.NOT_FOUND,
      message: `This entity ${entityName} does not exist`,
      code: 'ENTITY_NOT_FOUND'
    })
  }

  static AccountAlreadyCreated(): GenericError {
    return GenericError.of({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'This email is already used by a created account',
      code: 'ACCOUNT_ALREADY_CREATED'
    })
  }
}
