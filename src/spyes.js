const extend = require('defaulty');

/**
 * @class
 */
class Spyes {

    /**
     * Create instance
     * @param element {String|Element} element that you want watch
     * @param [opts] {Object} configuration object
     * @param [opts.autoWatch=true] {boolean} auto watch
     * @param [opts.checkMs=50] {number} interval in milliseconds for every check
     * @param [opts.unwatchAfterSize=false] {boolean} stop check after detect element resize
     * @param [opts.unwatchAfterPosition=false] {boolean} stop check after detect element position
     */
    constructor(element, opts = {}) {

        this.element = typeof element === 'string' ? document.querySelector(element) : element;

        this.opts = extend.copy(opts, {
            autoWatch: true,
            checkMs: 50,
            unwatchAfterSize: false,
            unwatchAfterPosition: false,
        });

        this._size = {
            width: 0,
            height: 0
        };

        this._position = {
            x: 0,
            y: 0
        };

        this._onSize = () => {
        };

        this._onPosition = () => {
        };

        if (this.opts.autoWatch)
            this.watch();
    }

    /**
     * Check
     * @returns {Spyes}
     * @ignore
     * @private
     */
    check() {
        let exists = Boolean(this.element);
        if (exists) {
            if (this.sizeIsChanged()) {

                let oldSize = this._currentSize();
                let newSize = this._updateSize();

                this._onSize.call(null, newSize, oldSize);
                if (this.opts.unwatchAfterSize)
                    this.unwatch();
            }
            if (this.positionIsChanged()) {

                let oldPosition = this._currentPosition();
                let newPosition = this._updatePosition();

                this._onPosition.call(null, newPosition, oldPosition);
                if (this.opts.unwatchAfterPosition)
                    this.unwatch();
            }
        }
        return this;
    }

    /**
     * Check if size is changed
     * @returns {boolean}
     */
    sizeIsChanged() {
        return this.element.offsetWidth !== this._size.width || this.element.offsetHeight !== this._size.height;
    }

    /**
     * Update size
     * @returns {{width: number, height: number}}
     * @private
     * @ignore
     */
    _updateSize() {
        return this._size = Object.assign({}, {
            width: this.element.offsetWidth,
            height: this.element.offsetHeight
        });
    }

    /**
     * Get current size
     * @returns {{x: number, y: number}}
     * @private
     * @ignore
     */
    _currentSize() {
        return Object.assign({}, this._size);
    }

    /**
     * Check if position is changed
     * @returns {boolean}
     */
    positionIsChanged() {
        const offset = this._bestPositionProvider();
        return offset.x !== this._position.x || offset.y !== this._position.y;
    }

    _bestPositionProvider() {
        let offsetLeft = this.element.offsetLeft;
        let left = parseInt(this.element.style.left) || 0;
        let offsetTop = this.element.offsetTop;
        let top = parseInt(this.element.style.top) || 0;
        return {
            x: offsetLeft || left,
            y: offsetTop || top
        }
    }

    /**
     * Update position
     * @returns {{x: number, y: number}}
     * @private
     * @ignore
     */
    _updatePosition() {
        const offset = this._bestPositionProvider();
        return this._position = Object.assign({}, {
            x: offset.x,
            y: offset.y
        });
    }

    /**
     * Get current position
     * @returns {{x: number, y: number}}
     * @private
     * @ignore
     */
    _currentPosition() {
        return Object.assign({}, this._position);
    }

    /**
     * Start watching
     * @returns {Spyes}
     */
    watch() {
        this._intervalObject = setInterval(() => {
            this.check();
        }, this.opts.checkMs);
        return this;
    }

    /**
     * Stop watching
     * @returns {Spyes}
     */
    unwatch() {
        clearInterval(this._intervalObject);
        this._intervalObject = null;
        return this;
    }

    /**
     * Fired when element changes size
     * @param callback
     * @returns {Spyes}
     */
    onSize(callback) {
        this._onSize = callback;
        return this;
    }

    /**
     * Fired when element changes position
     * @param callback
     * @returns {Spyes}
     */
    onPosition(callback) {
        this._onPosition = callback;
        return this;
    }

}

module.exports = Spyes;