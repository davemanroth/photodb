var VisFeedbackGenerator = function (c) {
	var OFFSET = 30, STROKE = 3;
	var canvas = c;
	var ctx = canvas.getContext('2d');
	var markX = 0, markY = 0;
	var imgX, imgY;
	var getMousePos = function (event) {
		var area = canvas.getBoundingClientRect();
		return {
			x: event.clientX - area.left,
			y: event.clientY - area.top
		}
	}

	var drawRect = function (mouse) {
		markX = mouse.x - OFFSET / 2;
		markY = mouse.y - OFFSET / 2;
		ctx.beginPath();
		ctx.rect(markX, markY, OFFSET, OFFSET);
		ctx.fillStyle = "rgba(240, 240, 65, 0.8)";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	return {
		setMark: function (e) {
			var mouse = getMousePos(e);
			drawRect(mouse);
		},
		removeMark: function (coords) {
			var x = coords.x - STROKE;
			var y = coords.y - STROKE;
			var area = OFFSET + STROKE * 2;
			ctx.clearRect(x, y, area, area);
		},
		setSize: function (width, height) {
			canvas.width = width;
			canvas.height = height;
		},
		getCoords: function () {
			return {
				x: markX,
				y: markY
			}
		}
	}
}

