class Mouse {
  /**
   * @param {Logger} opt.logger
   * @param {string} opt.tag logger tag
   * @param {boolean} opt.debug
   */
  constructor(opt) {
    this._logger = opt.logger;

    this._tag = opt.tag;
    this._debug = opt.debug;

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
    return { x: this._x, y: this._y };
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _addEventListeners() {
    if (this._debug) this._logger.calling(this._tag, '_addEventListeners');

    window.addEventListener('mouseout', this._mouseOutListener.bind(this));
    window.addEventListener('mousemove', this._mouseMoveListener.bind(this));
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _mouseOutListener() {
    if (this._debug) this._logger.calling(this._tag, '_mouseOutListener');

    this._x = undefined;
    this._y = undefined;
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _mouseMoveListener(event) {
    if (this._debug) this._logger.calling(this._tag, '_mouseMoveListener');

    this._x = event.x;
    this._y = event.y;
  }
}
