/* globals DirectoryNotFoundError FileNotFoundError */ // used in docs
import { CommonError } from './common-error'
import { generateNotFoundMessage } from './lib/generate-not-found-message'
import { registerParent } from './map-error-to-http-status'

const myName = 'NotFoundError'

/**
 * An error indicating a resource or entity cannot be found. This error is used with local and remote resources/entities
 * where the fundamental issue is the named thing not being present.
 *
 * Consider whether any of the following errors might be more precise or better suited:
 * - {@link DirectoryNotFoundError}
 * - {@link FileNotFoundError}
 */
const NotFoundError = class extends CommonError {
  /**
   * {@link NotFoundError} constructor.
   * @param {object} [options = {}] - Constructor options.
   * @param {string|undefined} [options.resource = undefined] - The name or short description of the missing resource.
   * @param {string} [options.code = 'ENOENT'] - The code to use with the error. Should generally be left to the
   *   default.
   * @param {string} options.name - @hidden Used internally to set the name; falls through to {@link CommonError}
   *   constructor.`
   * @param {object} [options.options = {}] - @hidden The remainder of the options to to pass to super-constructor.
   */
  constructor({ name = myName, code = 'ENOENT', ...options } = {}) {
    options.message = options.message || generateNotFoundMessage(options)
    super({ name, code, ...options })
  }
}

registerParent(myName, Object.getPrototypeOf(NotFoundError).name)

NotFoundError.typeName = myName

export { NotFoundError }
