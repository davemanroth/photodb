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

	.controller('VisController', ['$scope', '$element', '$compile', 
		function ($scope, $element, $compile) {
			var that = this;
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

			$scope.createCommentBox = function () {
				var visCom = $compile('<vis-comment>')($scope);
				$element.find('vis-comments').append(visCom);
				$scope.coords = vfg.getCoords();
			}

			this.addComment = function (comment) {
				console.log(comment);
			}

			this.cancelComment = function () {
				vfg.removeMark($scope.coords);
				//console.log($scope.coords);
			}
		}
	])

	.directive('visFeedback', 
		function () {
			return {
				restrict: 'E',
				controller: 'VisController'
			}
		}
	)

	.directive('visComments', 
		function () {
			return {
				restrict: 'E',
			}
		}
	)

	.directive('visComment', 
		function () {
			return {
				replace: true,
				controller: 'VisController',
				restrict: 'E',
				templateUrl: '/partials/commentBox.jade',
				link: function (scope, element, attrs, visCtrl) {
					scope.submitComment = function () {
						visCtrl.addComment(scope.commentText);
					}

					scope.cancelComment = function () {
						visCtrl.cancelComment();
					}
				}
			}
		}
	);
/*
	*/
