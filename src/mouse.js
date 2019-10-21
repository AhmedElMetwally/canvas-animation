class Mouse {
  /**
   * @param {boolean} debug
   */
  constructor(debug) {
    this._logger = new Logger('Mouse');

    this._debug = debug || false;
    this._x = undefined;
    this._y = undefined;

    this._addEventListeners();
  }

  /**
   * @public
   *
   * @returns {Object}
   */
  getMousePosition() {
    if (this._debug) this._logger.calling('getMousePosition');

    return { x: this._x, y: this._y };
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _addEventListeners() {
    if (this._debug) this._logger.calling('_addEventListeners');

    window.addEventListener('mouseout', this._mouseOutListener.bind(this));
    window.addEventListener('mousemove', this._mouseMoveListener.bind(this));
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _mouseOutListener() {
    if (this._debug) this._logger.calling('_mouseOutListener');

    this._x = undefined;
    this._y = undefined;
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _mouseMoveListener(event) {
    if (this._debug) this._logger.calling('_mouseMoveListener');

    this._x = event.x;
    this._y = event.y;
  }
}
