class Logger {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;
  }

  /**
   * @public
   *
   * @param {string} tag
   * @param {string} functionName
   *
   * @returns {void}
   */
  calling(tag = '', functionName = '') {
    this._log(`@${this._name} @${tag} @${functionName} calling...`, 'green');
  }

  /**
   * @public
   *
   * @param {string} tag
   * @param {string} functionName
   * @param {string} message
   *
   * @returns {void}
   */
  log(tag = '', functionName = '', message = '') {
    this._log(`@${this._name} @${tag} @${functionName} ${message}`, 'white');
  }

  /**
   * @public
   *
   * @param {string} tag
   * @param {string} functionName
   * @param {string} message
   * @param {object} stack
   *
   * @returns {void}
   */
  error(tag = '', functionName = '', message = '', stack = {}) {
    this._log(`@${this._name} @${tag} @${functionName} ${message}`, 'red');
    this._logErrorStack(stack);
  }

  /**
   * @private
   *
   * @param {string} message
   * @param {string} color
   *
   * @returns {void}
   */
  _log(message, color) {
    console.log(
      `%c${message}`,
      `color:${color};font-size:18px;background:black;padding:5px;border-radius:5px`,
    );
  }

  /**
   * @private
   *
   * @param {object} stack
   *
   * @returns {void}
   */
  _logErrorStack(stack) {
    console.error(stack);
  }
}
