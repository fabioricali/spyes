# Spyes
Detect when a DOM element changes size or position.

<a href="https://travis-ci.org/fabioricali/spyes" target="_blank"><img src="https://travis-ci.org/fabioricali/spyes.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

## Installation

### Node.js
```
npm install spyes --save
```

### Browser

#### Local
```html
<script src="node_modules/spyes/dist/spyes.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/spyes/dist/spyes.min.js"></script>
```

## Example
```javascript
const spyes = require('spyes');

new spyes(document.getElementById('my-element'))
    .onSize((newSize, oldSize)=> console.log('size changed', newSize, oldSize))
    .onPosition((newPosition, oldPosition)=> console.log('position changed', newPosition, oldPosition));
```

## API

<a name="Spyes"></a>

## Spyes
**Kind**: global class  

* [Spyes](#Spyes)
    * [new Spyes(element, [opts])](#new_Spyes_new)
    * [.sizeIsChanged()](#Spyes+sizeIsChanged) ⇒ <code>boolean</code>
    * [.positionIsChanged()](#Spyes+positionIsChanged) ⇒ <code>boolean</code>
    * [.watch()](#Spyes+watch) ⇒ [<code>Spyes</code>](#Spyes)
    * [.unwatch()](#Spyes+unwatch) ⇒ [<code>Spyes</code>](#Spyes)
    * [.onSize(callback)](#Spyes+onSize) ⇒ [<code>Spyes</code>](#Spyes)
    * [.onPosition(callback)](#Spyes+onPosition) ⇒ [<code>Spyes</code>](#Spyes)

<a name="new_Spyes_new"></a>

### new Spyes(element, [opts])
Create instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>element</td><td><code>String</code> | <code>Element</code></td><td></td><td><p>element that you want watch</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>configuration object</p>
</td>
    </tr><tr>
    <td>[opts.autoWatch]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>auto watch</p>
</td>
    </tr><tr>
    <td>[opts.checkMs]</td><td><code>number</code></td><td><code>50</code></td><td><p>interval in milliseconds for every check</p>
</td>
    </tr><tr>
    <td>[opts.unwatchAfterSize]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>stop check after detect element resize</p>
</td>
    </tr><tr>
    <td>[opts.unwatchAfterPosition]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>stop check after detect element position</p>
</td>
    </tr>  </tbody>
</table>

<a name="Spyes+sizeIsChanged"></a>

### spyes.sizeIsChanged() ⇒ <code>boolean</code>
Check if size is changed

**Kind**: instance method of [<code>Spyes</code>](#Spyes)  
<a name="Spyes+positionIsChanged"></a>

### spyes.positionIsChanged() ⇒ <code>boolean</code>
Check if position is changed

**Kind**: instance method of [<code>Spyes</code>](#Spyes)  
<a name="Spyes+watch"></a>

### spyes.watch() ⇒ [<code>Spyes</code>](#Spyes)
Start watching

**Kind**: instance method of [<code>Spyes</code>](#Spyes)  
<a name="Spyes+unwatch"></a>

### spyes.unwatch() ⇒ [<code>Spyes</code>](#Spyes)
Stop watching

**Kind**: instance method of [<code>Spyes</code>](#Spyes)  
<a name="Spyes+onSize"></a>

### spyes.onSize(callback) ⇒ [<code>Spyes</code>](#Spyes)
Fired when element changes size

**Kind**: instance method of [<code>Spyes</code>](#Spyes)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="Spyes+onPosition"></a>

### spyes.onPosition(callback) ⇒ [<code>Spyes</code>](#Spyes)
Fired when element changes position

**Kind**: instance method of [<code>Spyes</code>](#Spyes)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/spyes/blob/master/CHANGELOG.md">here</a>

## License
spyes is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>