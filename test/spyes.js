const Spyes = require('../dist/spyes');
const be = require('bejs');

function createElement(id) {
    let element = document.createElement('div');
    element.setAttribute('id', id);
    element.style.position = 'absolute';
    document.body.appendChild(element);
}

function removeElement(id) {
    let element = document.querySelector('#' + id);
    document.body.removeChild(element);
}

function sizeElement(id, size) {
    let el = document.querySelector('#' + id);
    el.style.width = size.width + 'px';
    el.style.height = size.height + 'px';
    /*console.log('w', el.style.width);
    console.log('h', el.style.height);
    console.log('offsetWidth', el.offsetWidth);
    console.log('offsetHeight', el.offsetHeight);*/
}

function positionElement(id, pos) {
    let el = document.querySelector('#' + id);
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.offsetTop = pos.y;
    el.offsetLeft = pos.x;
    console.log('x', el.style.left);
    console.log('y', el.style.top);
    console.log('oy', el.offsetLeft);
}

describe('Spyes', function () {
    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')();
        Object.defineProperties(window.HTMLElement.prototype, {
            offsetLeft: {
                get: function() { return parseFloat(window.getComputedStyle(this).marginLeft) || 0; }
            },
            offsetTop: {
                get: function() { return parseFloat(window.getComputedStyle(this).marginTop) || 0; }
            },
            offsetHeight: {
                get: function() { return parseFloat(window.getComputedStyle(this).height) || 0; }
            },
            offsetWidth: {
                get: function() { return parseFloat(window.getComputedStyle(this).width) || 0; }
            }
        });
        createElement('e1');
    });

    after(function () {
        this.jsdom();
        //removeElement('e1');
    });

    it('should be ok', function (done) {
        let sizeChanged = 0;
        let positionChanged = 0;

        new Spyes('#e1')
            .onSize((_new, _old) => {
                if (be.equal(_new, _old)) return;
                sizeChanged++;
                console.log('size changed');
            })
            .onPosition((_new, _old) => {
                if (be.equal(_new, _old)) return;
                positionChanged++;
                console.log('position changed', positionChanged);
                if (sizeChanged === 2 && positionChanged === 2)
                    done();
            });
        setTimeout(() => {
            sizeElement('e1', {
                width: 200,
                height: 150
            });
        }, 500);
        setTimeout(() => {
            sizeElement('e1', {
                width: 300,
                height: 450
            });
        }, 1000);
        setTimeout(() => {
            positionElement('e1', {
                x: 5,
                y: 12
            });
        }, 1100);
        setTimeout(() => {
            positionElement('e1', {
                x: 89,
                y: 32
            });
        }, 1600);
    });

});

