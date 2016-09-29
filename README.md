# handleRotation.js
Add a handle to rotate the Dom element

## Demo
[codepen demo](http://codepen.io/MaxPoon/pen/qaXVOB) 
## Installation
	npm install handle-rotation.js
Link jquery to your html file since out plugin depends on it:
```<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>```

Link the plugin to html file:
```<script type="text/javascript" src="handleRotate.js"></script>```

## API
### `addHandle(target, originX, originY, handleX, handleY, color, handleWidth, handleHeight)`
Add a handle to the target dom element with the customized attributes.

target: the target dom element.
originX: the x value of the origin for rotation in percentage. Defalt value: 50.
originY: the y value of the origin for rotation in percentage. Defalt value: 50.
handleX: the horizontal position of the handle related to the target. Defalt value: 120.
handleY: the vertical position of the handle related to the target. Defalt value: 50.
color: color of the handle. Defalt value: "black".
handleWidth: width of the handle in px. Defalt value: 10.
handleHeight: height of the handle in px. Defalt value: 10.

## Demo Example
HTML:
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="handleRotate.js"></script>
	
</head>
<body>
<div style="height:1000px;width:1000px">
	<div id="demo" style="left:300px;top:300px;height:50px;width:50px;position:absolute;background-color:red"></div>
</div>
	<script type="text/javascript" src="demo.js"></script>
</body>
</html>
```
Javascript:
```js
var r = new handleRotation();
var div = document.getElementById("demo");
r.addHandle(div);
```