/* global AuthenticationError AuthorizationConditionsNotMetError BadCredentialsError AuthorizationConditionsNotMetError CommonError NoAccessError */ // used in docs
import { AuthError } from './auth-error'
import { generateAuthMessage } from './lib/generate-auth-message'
import { registerParent } from './map-error-to-http-status'

const myName = 'OperationNotPermittedError'

/**
 * An {@link AuthError} indicating the user lacks authorization to perform some operation. This is most appropriate
 * when the user is trying to _do_ something. If the user is attempting to "access" a resource, the {@link
 * NoAccessError} or it's children may be better suited. Consider whether any of the following errors might be more
 * precise or better suited:
 * - {@link AuthenticationError}
 * - {@link AuthorizationConditionsNotMetError} - Use this when the user is authorized to perform the operation under
 *   some conditions.
 * - {@link BadCredentialsError}
 * - {@link AuthorizationConditionsNotMetError}
 * - {@link NoAccessError}
 */
const OperationNotPermittedError = class extends AuthError {
  /**
   * {@link OperationNotPermittedError} constructor.
   * @param {object} [options = {}] - Constructor options.
   * @param {string} [options.action = 'action'] - A short description of the action.
   * @param {string|undefined} options.target - The name or short description of the target.
   * @param {string} [options.issue = 'is not permitted'] - The auth issue.
   * @param {string} options.name - @hidden Used internally to set the name; falls through to {@link CommonError}
   *   constructor.`
   * @param {object} [options.options = {}] - @hidden The remainder of the options to to pass to super-constructor.
   */
  constructor({ name = myName, issue = 'is not permitted', ...options } = {}) {
    options.message = options.message || generateAuthMessage({ issue, ...options })
    super({ name, ...options })
  }
}

registerParent(myName, Object.getPrototypeOf(OperationNotPermittedError).name)

OperationNotPermittedError.typeName = myName

export { OperationNotPermittedError }
