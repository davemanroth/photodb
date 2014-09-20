angular.module('feedbackCtrl', [])

	.controller('FeedbackController', ['$scope', '$http', 
		function ($scope, $http) {
			$scope.parent = self;
			$scope.visual, $scope.feedbackArea = false;
			$scope.feedbackOption = true;
			$scope.addFeedback = function() {
			}
			$scope.showHideFeedback = function ($event) {
				var option = $event.target.id;
				switch (option) {
					case 'showFeedback':
						$scope.feedbackArea = true;
						$scope.feedbackOption = false;
						break;
					case 'cancelFeedback':
						$scope.feedbackArea = false;
						$scope.feedbackOption = true;
						break;
				}
			}
			$scope.showHideVis = function ($event) {
				var checkbox = $event.target;
				$scope.visual = checkbox.checked ? true : false;
			}
		}
	])

	.controller('VisController', ['$scope', 
		function ($scope) {
			var canvas = document.getElementById('vis-body');
			var img = document.getElementById('imgDetail');
			if (canvas == null) {
				return;
			}
			angular.element(img).on('load', function () {
				canvas.width = $(this).width();
				canvas.height = $(this).height();
			});

			canvas.addEventListener('click', addVis, false);

			function addVis (event) {
				var OFFSET = 20;
				var mouse = getMousePos(canvas, event);
				drawRect(canvas, mouse, OFFSET);
			}

			function getMousePos(canvas, event) {
				var area = canvas.getBoundingClientRect();
				return {
					x: event.clientX - area.left,
					y: event.clientY - area.top
				};
			}

			function drawRect(canvas, mouse, OFFSET) {
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
		}
	]);
