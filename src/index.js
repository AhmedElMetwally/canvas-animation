class PlayWithCanvas {
  /**
   * @param {number} minRadius
   * @param {number} maxRadius
   * @param {number} circlesCount
   * @param {boolean} debug
   */
  constructor(opt) {
    this._randomColor = new RandomColor();
    this._canvas = new Canvas('PlayWithCanvas', opt.debug);
    this._mouse = new Mouse();
    this._logger = new Logger('PlayWithCanvas');

    this._minRadius = opt.minRadius;
    this._maxRadius = opt.maxRadius;
    this._circlesCount = opt.circlesCount;
    this._debug = opt.debug || false;

    this._circlesArray = [];
  }

  /**
   * @public
   *
   * @returns {void}
   */
  init() {
    if (this._debug) this._logger.calling('init');

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
    if (this._debug) this._logger.calling('_clearCirclesArray');

    this._circlesArray = [];
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _draw() {
    if (this._debug) this._logger.calling('_draw');

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
    if (this._debug) this._logger.calling('_animate');

    this._canvas.clearRect();

    for (let i = 0, len = this._circlesArray.length; i < len; ++i) {
      const mousePosition = this._mouse.getMousePosition();
      this._circlesArray[i].update(mousePosition);
    }
  }

  /**
   * @private

   * @param {string} callback
   * 
   * @returns {void}
   */
  _setInterval(callback) {
    if (this._debug) this._logger.calling('_setInterval');

    setInterval(callback, 15);
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _resizeWindowSubscription() {
    if (this._debug) this._logger.calling('_resizeWindowSubscription');

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
    if (this._debug) this._logger.calling('_onResizeWindow');

    this._clearCirclesArray();
    this._draw();
    this._animate();
  }
}

const playWithCanvas = new PlayWithCanvas({
  minRadius: 3,
  maxRadius: 50,
  circlesCount: 800,
  debug: false,
});

playWithCanvas.init();
