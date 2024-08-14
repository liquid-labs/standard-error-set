import { mapErrorToHttpStatus } from './map-error-to-http-status'
import { mapHttpStatusToName } from './map-http-status-to-name'

/**
 * A base class for common errors. To create a common error of your own, extend this class.
 * ```js
 * const myName = 'MyError'
 *
 * export const MyError = class extends CommonError {
 *   constructor(foo, options) {
 *     const message = `You hit ${foo}!`
 *     super(name, message, options)
 *   }
 * }
 * MyError.typeName = myName
 * ```
 * @param {object} options - Creation objects.
 * @param {string} options.name - The name of error. In general, this should match the class name.
 * @param {string} options.message - The error message.
 * @param {number} options.status - (optional) The status override for this particular error instance.
 * @param {object} options.options - The options to pass to the `Error` super-constructor.
 */
const CommonError = class extends Error {
  constructor ({ name, message, ...options }) {
    super(message, options)

    this.name = name
    this.code = options.code

    this.status = options.status || mapErrorToHttpStatus(this.name)
    this.statusName = mapHttpStatusToName(this.status)
  }
}

export { CommonError }
