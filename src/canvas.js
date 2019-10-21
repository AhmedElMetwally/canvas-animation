class Canvas {
  /**
   * @param {string} id
   * @param {boolean} debug
   */
  constructor(id, debug) {
    this._logger = new Logger('Canvas');

    this._id = id;
    this._debug = debug || false;

    this._canvas = undefined;
    this._ctx = undefined;

    this.$resizeWindow = new rxjs.Subject();

    this._createElement();
    this._addEventListeners();
  }

  /**
   * @public
   *
   * @returns {CanvasRenderingContext2D}
   */
  getContext() {
    if (this._debug) this._logger.calling('getContext');

    return this._ctx;
  }

  /**
   * @public
   *
   * @returns {void}
   */
  clearRect() {
    if (this._debug) this._logger.calling('clearRect');

    this._ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _createElement() {
    if (this._debug) this._logger.calling('_createElement');

    this._canvas = document.createElement('canvas');

    this._canvas.setAttribute('id', this._id);

    const body = document.querySelector('body');

    body.appendChild(this._canvas);

    this._canvas.width = innerWidth;
    this._canvas.height = innerHeight;

    this._ctx = this._canvas.getContext('2d');
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _addEventListeners() {
    if (this._debug) this._logger.calling('_addEventListeners');

    window.addEventListener('resize', this._onResizeWindow.bind(this));
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _onResizeWindow() {
    if (this._debug) this._logger.calling('_onResizeWindow');

    this._canvas.width = innerWidth;
    this._canvas.height = innerHeight;

    this.$resizeWindow.next();
  }
}

console.log();
