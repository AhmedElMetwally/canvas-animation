class RandomColor {
  /**
   * @param {Logger} opt.logger
   * @param {string} tag logger tag
   * @param {boolean} debug
   */
  constructor(opt) {
    this._logger = opt.logger;

    this._tag = opt.tag;
    this._debug = opt.debug;

    this._letters = '0123456789ABCDEF';
  }

  /**
   * @public
   *
   * @returns {string}
   */
  getColor() {
    if (this._debug) this._logger.calling(this._tag, 'getColor');

    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += this._letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
