/**
 * Creates an http error
 *
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
  /**
   * Creates an instance of HttpError.
   *
   * provide a status and a messages
   *
   * @param {any} status
   * @param {any} args
   * @memberof HttpError
   */
  constructor(...args) {
    super(...args);
    this.isAuthMiddleware = true;

    Error.captureStackTrace(this, HttpError);
  }
}

module.exports = HttpError;
