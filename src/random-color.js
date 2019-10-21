class RandomColor {
  /**
   * @param {boolean} debug
   */
  constructor(debug) {
    this._logger = new Logger('RandomColor');

    this._debug = debug || false;
    this._letters = '0123456789ABCDEF';
  }

  /**
   * @public
   *
   * @returns {string}
   */
  getColor() {
    if (this._debug) this._logger.calling('getColor');

    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += this._letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
