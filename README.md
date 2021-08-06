# animation
engine for easy animations

#### Steps for usage
```
npm i @oyi/animation -S
```
###### html
```html
<div id="div">0</div>
```
###### javascript
```javascript
import Animation form '@oyi/animation'
let div = document.getElementById('div')
let an = new Animation({x: 0}, {
    duration: 2500,
    delayTime: 1000,
    cycle: 0
})
.to({x: 1000})
.onUpdate((data) => {
    div.innerText = data.x
})
.start()
```