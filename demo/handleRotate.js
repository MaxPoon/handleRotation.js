(function(){
	var handleRotation = (function(){
		var handleRotation = function(){
			var rotationTarget=null, click_x=0, click_y=0,
				origin_x=0, origin_y=0, last_angle = 0, rotate_rad=0,start_x=0,start_y=0,
				degree=0, target=null;

			document.body.onmousedown = function(e){
				if (e.target.className=="handle") {
					rotationTarget = e.target.parentNode;
					if (!$(e.target.parentNode).data("origin")) $(e.target.parentNode).data("origin", {
						left: $(e.target.parentNode).offset().left,
						top: $(e.target.parentNode).offset().top
					});
					click_x = e.pageX;
					click_y = e.pageY; // clicked point
					origin_x = $(e.target.parentNode).data("origin").left;
					origin_y = $(e.target.parentNode).data("origin").top; // origin point
					last_angle = $(e.target.parentNode).data("last_angle") || 0;
				}
			}
			document.body.onmousemove = function(e){
				if(rotationTarget===null) return false;
				start_x = e.pageX;
				start_y = e.pageY; //starting point
				if (start_x !== origin_x && start_y !== origin_y) {
				rotate_rad = Math.atan2(start_y - origin_y, start_x - origin_x); // current to origin
				rotate_rad -= Math.atan2(click_y - origin_y, click_x - origin_x); // handle to origin
				rotate_rad += last_angle; // relative to the last one
				degree = (rotate_rad * (360 / (2 * Math.PI)));
				target = $(rotationTarget);
				target.css('-moz-transform', 'rotate(' + degree + 'deg)');
				target.css('-moz-transform-origin', '50% 50%');
				target.css('-webkit-transform', 'rotate(' + degree + 'deg)');
				target.css('-webkit-transform-origin', '50% 50%');
				target.css('-o-transform', 'rotate(' + degree + 'deg)');
				target.css('-o-transform-origin', '50% 50%');
				target.css('-ms-transform', 'rotate(' + degree + 'deg)');
				target.css('-ms-transform-origin', '50% 50%');
				}
			}
			document.body.onmouseup = function(e){
				rotationTarget = null;
				start_x = e.pageX;
				start_y = e.pageY;
				// Saves the last angle for future iterations
				rotate_rad = Math.atan2(start_y - origin_y, start_x - origin_x);// current to origin
				rotate_rad -= Math.atan2(click_y - origin_y, click_x - origin_x); // handle to origin
				rotate_rad += last_angle;
				$(e.target.parentNode).data("last_angle", rotate_rad);
			}
		};
		handleRotation.prototype.addHandle = function(target,originX=50,originY=50,handleX=120,handleY=50,color="black",handleWidth=10,handleHeight=10){
			if(!target) return false;
			originPosition = (originX+"% ")+(originY+"%");
			target.style.WebkitTransformOrigin = originPosition;
			target.style.msTransformOrigin = originPosition;
			target.style.transformOrigin = originPosition;
			target.style.WebkitTransform = "rotate(0deg)";
			target.style.msTransform = "rotate(0deg)";
			target.style.transform = "rotate(0deg)";
			var newHandle = document.createElement("div");
			newHandle.style.width = handleWidth+"px";
			newHandle.style.height = handleHeight+"px";
			newHandle.style.position = "absolute";
			newHandle.className+="handle";
			newHandle.style.top = (parseInt(target.style.height)*handleY/100-handleHeight)+"px";
			newHandle.style.left = handleX+"%";
			newHandle.style.backgroundColor=color;
			target.appendChild(newHandle);
		}
		return handleRotation;
	})();
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
		module.exports = handleRotation;
	else
		window.handleRotation = handleRotation;
})();