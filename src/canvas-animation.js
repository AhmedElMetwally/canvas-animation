class CanvasAnimation {
  /**
   * @param {RandomColor} opt.randomColor
   * @param {Canvas} opt.canvas
   * @param {Mouse} opt.mouse
   * @param {Logger} opt.logger
   * @param {number} opt.minRadius
   * @param {number} opt.maxRadius
   * @param {number} opt.circlesCount
   * @param {string} opt.tag logger tag
   * @param {boolean} opt.debug
   *
   */
  constructor(opt) {
    this._randomColor = opt.randomColor;
    this._canvas = opt.canvas;
    this._mouse = opt.mouse;
    this._logger = opt.logger;

    this._minRadius = opt.minRadius;
    this._maxRadius = opt.maxRadius;
    this._circlesCount = opt.circlesCount;
    this._tag = opt.tag;
    this._debug = opt.debug;

    this._circlesArray = [];
  }

  /**
   * @public
   *
   * @returns {void}
   */
  init() {
    if (this._debug) this._logger.calling(this._tag, 'init');

    this._draw();
    this._animate();
    this._setInterval(this._animate.bind(this));
    this._resizeWindowSubscription();
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _clearCirclesArray() {
    if (this._debug) this._logger.calling(this._tag, '_clearCirclesArray');

    this._circlesArray = [];
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _draw() {
    if (this._debug) this._logger.calling(this._tag, '_draw');

    for (let i = 0, len = this._circlesCount; i < len; ++i) {
      const radius = this._minRadius;

      const x = Math.random() * (innerWidth - radius * 2) + radius;
      const y = Math.random() * (innerHeight - radius * 2) + radius;

      const dx = (Math.random() - 0.5) * 8;
      const dy = (Math.random() - 0.5) * 8;

      this._circlesArray.push(
        new Circle({
          x,
          y,
          dx,
          dy,
          radius,
          minRadius: this._minRadius,
          maxRadius: this._maxRadius,
          color: this._randomColor.getColor(),
          ctx: this._canvas.getContext(),
        }),
      );
    }
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _animate() {
    this._canvas.clearRect();

    for (let i = 0, len = this._circlesArray.length; i < len; ++i) {
      const mousePosition = this._mouse.getMousePosition();
      this._circlesArray[i].update(mousePosition);
    }
  }

  /**
   * @private
   *
   * @param {string} callback
   *
   * @returns {void}
   */
  _setInterval(callback) {
    setInterval(callback, 15);
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _resizeWindowSubscription() {
    if (this._debug)
      this._logger.calling(this._tag, '_resizeWindowSubscription');

    this._canvas.$resizeWindow
      .pipe(rxjs.operators.throttleTime(400))
      .subscribe(this._onResizeWindow.bind(this));
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _onResizeWindow() {
    if (this._debug) this._logger.calling(this._tag, '_onResizeWindow');

    this._clearCirclesArray();
    this._draw();
    this._animate();
  }
}
