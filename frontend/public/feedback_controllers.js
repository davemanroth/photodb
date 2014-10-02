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
				scope:true,
				restrict: 'E',
				replace: true,
				templateUrl: 'test.html'
				//template: '<h2>Testing, testing...</h2>'
			}
		}
	)

	.directive('comments', 
		function () {
			return {
				restrict: 'E',
				template: '<h3>Second test</h3>'
			}
		}
	);
/*
	*/
