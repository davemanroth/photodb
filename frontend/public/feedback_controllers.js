angular.module('feedbackCtrl', [])

	.controller('FeedbackController', ['$scope', '$http', 
		function ($scope, $http) {
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

	.directive('visFeedback', 
		function () {
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					var canvas = document.getElementById('vis-body');
					var img = document.getElementById('img-detail');
					var vfg = new VisFeedbackGenerator(canvas);

					img.addEventListener('load', function () {
						vfg.setSize(img.width, img.height);
					});

					window.addEventListener('resize', function () {
						vfg.setSize(img.width, img.height);
					});

					canvas.addEventListener('click', function (e) {
						vfg.setMark(e);
					});
				}
			};
		}
	)
	
	.directive('visComment',
		function () {
			return {
				retrict: 'E',
				templateUrl: '/partials/comment_box.jade',
				controller: 'VisController',

	.controller('VisController', ['$scope', '$element',
		function ($scope, $element) {
			$scope.createComment = function () {
			}
		}
	]);
