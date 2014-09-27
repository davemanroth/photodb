var VisFeedbackMaker = function (c) {
	var canvas = c;
	var OFFSET = 20;
	var getMousePos = function (event) {
		var area = canvas.getBoundingClientRect();
		return {
			x: event.clientX - area.left,
			y: event.clientY - area.top
		};
	}

	var drawRect = function (mouse) {
		var ctx = canvas.getContext('2d');
		var x = mouse.x - OFFSET / 2;
		var y = mouse.y - OFFSET / 2;
		ctx.beginPath();
		ctx.rect(x, y, OFFSET, OFFSET);
		ctx.fillStyle = "rgba(240, 240, 65, 0.5)";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	return {
		setMark: function (e) {
			var mouse = getMousePos(e);
			drawRect(mouse);
		}
	}
}

