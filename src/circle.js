class Circle {
  /**
   * @param {Logger} opt.logger
   * @param {number} opt.x
   * @param {number} opt.y
   * @param {number} opt.dx
   * @param {number} opt.dy
   * @param {number} opt.radius
   * @param {number} opt.minRadius
   * @param {number} opt.maxRadius
   * @param {string} opt.color
   * @param {CanvasRenderingContext2D} opt.ctx
   * @param {string} opt.tag logger tag
   * @param {boolean} opt.debug
   */
  constructor(opt) {
    this._logger = opt.logger;

    this._x = opt.x;
    this._y = opt.y;
    this._dx = opt.dx;
    this._dy = opt.dy;
    this._radius = opt.radius;
    this._minRadius = opt.minRadius;
    this._maxRadius = opt.maxRadius;
    this._color = opt.color;
    this._ctx = opt.ctx;
    this._tag = opt.tag;
    this._debug = opt.debug;

    this._draw();
  }

  /**
   * @private
   *
   * @returns {void}
   */
  _draw() {
    if (this._debug) this._logger.calling(tag, '_draw');

    this._ctx.beginPath();

    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);

    this._ctx.strokeStyle = this._color;
    this._ctx.stroke();
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
  }

  /**
   * @public
   *
   * @param {number} mousePosition.x
   * @param {number} mousePosition.y
   *
   * @returns {void}
   */
  update(mousePosition) {
    if (this._debug) this._logger.calling(this._tag, 'update');

    if (this._x + this._radius > innerWidth || this._x - this._radius < 0) {
      this._dx = -this._dx;
    }

    if (this._y + this._radius > innerHeight || this._y - this._radius < 0) {
      this._dy = -this._dy;
    }

    this._x += this._dx;
    this._y += this._dy;

    if (
      mousePosition.x - this._x < 75 &&
      mousePosition.x - this._x > -75 &&
      mousePosition.y - this._y < 75 &&
      mousePosition.y - this._y > -75
    ) {
      if (this._radius < this._maxRadius) {
        this._radius += 1;
      }
    } else if (this._radius > this._minRadius) {
      this._radius -= 0.6;
    }

    this._draw();
  }
}
