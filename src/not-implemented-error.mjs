/* global NotSupportedError UnavailableError */ // used in docs
import { CommonError } from './common-error'
import { registerParent } from './map-error-to-http-status'

const myName = 'NotImplementedError'

/**
 * An error indicating the requested operation is not currently implemented.
 * 
 * Consider whether any of the following errors might be more precise or better suited:
 * - {@link NotSupportedError} - Use this when the target is implemented, but does not support some feature or 
 *   condition captured in the request.
 * - {@link UnavailableError} - Use this when a resource exists, but is temporarily unavailable for some reason.
 */
const NotImplementedError = class extends CommonError {
  /**
   * Constructor for {$link NotImplementedError}.
   * 
   * See the [common parameters](#common-parameters) note for additional parameters.
   * @param {object} options - The input options.
   * @param {string|undefined} options.target - The name of the function, endpoint, service, etc. which the user is 
   *   trying to invoke.
   * @example
   * new NotImplementedError() // "Action not currently implemented."
   * new NotImplementedError({ target: '/some/url/endpoint'}) // "'/some/url/endpoint' is not currently implemented."
   */
  constructor ({ name = myName, ...options } = {}) {
    options.message = options.message || generateMessage(options)
    super({ name, ...options })
  }
}

registerParent(myName, Object.getPrototypeOf(NotImplementedError).name)

NotImplementedError.typeName = myName

const generateMessage = ({ target }) => {
  if (target === undefined) {
    return 'Action not currently implemented.'
  } else {
    return `'${target}' is not currently implemented.`
  }
}

export { NotImplementedError }
