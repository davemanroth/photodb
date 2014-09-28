var VisFeedbackGenerator = function (c) {
	var canvas = c;
	var markX, markY, imgX, imgY;
	var OFFSET = 20;
	var getMousePos = function (event) {
		var area = canvas.getBoundingClientRect();
		return {
			x: event.clientX - area.left,
			y: event.clientY - area.top
		}
	}

	var drawRect = function (mouse) {
		var ctx = canvas.getContext('2d');
		markX = mouse.x - OFFSET / 2;
		markY = mouse.y - OFFSET / 2;
		ctx.beginPath();
		ctx.rect(markX, markY, OFFSET, OFFSET);
		ctx.fillStyle = "rgba(240, 240, 65, 0.5)";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	var createCommentModule = function () {
		var commentOuter = document.createElement('div');
		var commentInner = document.createElement('div');
		var commentContents = createCommentContents();

		commentOuter.setAttribute('id', 'comment-outer');
		commentOuter.setAttribute('class', 'comment-outer');
		commentInner.setAttribute('class', 'comment-inner');

		commentContents.forEach( function (elem) {
			commentInner.appendChild(elem);
		});

		commentOuter.appendChild(commentInner);
		canvas.parentNode.appendChild(commentOuter);
	}

	var createCommentContents = function () {
		var title = document.createElement('h3');
		var textArea = document.createElement('textArea');
		var cancel = document.createElement('button');
		var submit = document.createElement('button');

		// Attributes
		cancel.setAttribute('ng-click', 'cancel()');
		submit.setAttribute('ng-click', 'submitComment()');
		textArea.setAttribute('ng-model', 'visComment');

		// Text
		cancel.textContent = 'Cancel';
		submit.textContent = 'Make comment';
		title.textContent = 'Comment';
		/*
		*/

		return [title, textArea, cancel, submit];
	}

	return {
		setMark: function (e) {
			var mouse = getMousePos(e);
			drawRect(mouse);
			//createCommentModule();
		},
		setSize: function (width, height) {
			canvas.width = width;
			canvas.height = height;
		},
		getMarkCoordinates: function () {
			return {
				x: markX,
				y: markY
			}
		}
	}
}

