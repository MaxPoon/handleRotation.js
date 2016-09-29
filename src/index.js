(function(){
	var handleRotation = (function(){
		var handleRotation = function(){
			var rotationTarget=null, h_x=0, h_y=0,
				o_x=0, o_y=0, last_angle = 0, s_rad=0,s_x=0,s_y=0,
				degree=0, target=null;

			document.body.onmousedown = function(e){
				if (e.target.className=="handle") {
					rotationTarget = e.target.parentNode;
					if (!$(e.target.parentNode).data("origin")) $(e.target.parentNode).data("origin", {
						left: $(e.target.parentNode).offset().left,
						top: $(e.target.parentNode).offset().top
					});
					h_x = e.pageX;
					h_y = e.pageY; // clicked point
					o_x = $(e.target.parentNode).data("origin").left;
					o_y = $(e.target.parentNode).data("origin").top; // origin point
					last_angle = $(e.target.parentNode).data("last_angle") || 0;
				}
			}
			document.body.onmousemove = function(e){
				if(rotationTarget===null) return false;
				s_x = e.pageX;
				s_y = e.pageY; //starting point
				if (s_x !== o_x && s_y !== o_y) {
				s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
				s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
				s_rad += last_angle; // relative to the last one
				degree = (s_rad * (360 / (2 * Math.PI)));
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
				s_x = e.pageX;
				s_y = e.pageY;
				// Saves the last angle for future iterations
				s_rad = Math.atan2(s_y - o_y, s_x - o_x);// current to origin
				s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
				s_rad += last_angle;
				$(e.target.parentNode).data("last_angle", s_rad);
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