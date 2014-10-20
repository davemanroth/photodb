angular.module('feedbackCtrl', [])

	.controller('FeedbackController', ['$scope', '$http', '$routeParams', 
		function ($scope, $http, $routeParams) {
			$scope.sortField = '-date_posted';
			$scope.visual, $scope.feedbackArea = false;
			$scope.feedbackOption = true;
			$scope.visData = [];

			$scope.showHideFeedback = function ($event) {
				var option = $event.target.id;
				switch (option) {
					case 'addFeedback':
					case 'cancelFeedback':
						$scope.feedbackArea = false;
						$scope.feedbackOption = true;
						break;
					case 'showFeedback':
						$scope.feedbackArea = true;
						$scope.feedbackOption = false;
						break;
				}
			}

			$scope.showHideVis = function ($event) {
				var checkbox = $event.target;
				$scope.newVis = checkbox.checked ? true : false;
			}

			/*
			$scope.$on('addToVisModel', function (event, data) {
				$scope.visData.push(data);
			});
			*/

			$scope.addFeedback = function (feedback) {
				//console.log($scope.visData);
				//var details = $scope.visData || [];
				var data = {
					photoid: $routeParams.id,
					like: feedback.like,
					improved: feedback.improved,
				};
				$http.post('/api/critiques/add', data)
					.success( function (retData) {
				// emit to parent controller so critique appears immediately
						$scope.$emit('update_critiques', retData);
					})
					.error( function (retData) {
					});
				/*
				*/
			}
		}
	])

	.controller('VisController', ['$scope', '$element',
		function ($scope, $element) {


	.directive('visFeedback', 
		function () {
			return {
				restrict: 'E',
				controller: 'VisController'
			}
		}
	)

	.directive('visNew', 
		function ($compile) {
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					scope.$on('vis-new-click', function (event, click) {
						var visCom = $compile('<vis-comment>')(scope);
						element.append(visCom);
					});
				}
			}
		}
	)

	.directive('visComment', 
		function () {
			return {
				replace: true,
				require: '^visFeedback',
				restrict: 'E',
				templateUrl: '/partials/commentBox.jade',
				link: function (scope, element, attrs, visCtrl) {
					scope.submitComment = function () {
						visCtrl.addComment(scope.commentText);
						scope.commentText = '';
						element.remove();
						scope.$destroy;
					}

					scope.cancelComment = function () {
						visCtrl.cancelComment();
						element.remove();
						scope.$destroy;
					}
				}
			}
		}
	)

	.directive('visMarker',
		function () {
			return {
				template: 'div.vis-marker.absolute',
				restrict: 'E'
			}
		}
	)

	.directive('visSavedArea',
		function () {
			return {
				restrict: 'E'
			}
		}
	)

	.directive('visSaved',
		function () {
			return {
				restrict: 'E'
			}
		}
	)


/*
	.controller('VisController', ['$scope', '$element', 
		function ($scope, $element) {
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
				$scope.coords = vfg.getCoords();
			});

			$scope.createCommentBox = function () {
				$scope.$broadcast('canvas-click', true);
			}

			this.addComment = function (comment) {
				var visData = {
					comment:comment,
					xCoord: $scope.coords.x,
					yCoord: $scope.coords.y
				};
				$scope.$emit('addToVisModel', visData);
			}

			this.cancelComment = function () {
				vfg.removeMark($scope.coords);
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
		function ($compile) {
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					scope.$on('canvas-click', function (event, click) {
						var visCom = $compile('<vis-comment>')(scope);
						element.append(visCom);
					});
				}
			}
		}
	)

	.directive('visComment', 
		function () {
			return {
				replace: true,
				require: '^visFeedback',
				restrict: 'E',
				templateUrl: '/partials/commentBox.jade',
				link: function (scope, element, attrs, visCtrl) {
					scope.submitComment = function () {
						visCtrl.addComment(scope.commentText);
						scope.commentText = '';
						element.remove();
						scope.$destroy;
					}

					scope.cancelComment = function () {
						visCtrl.cancelComment();
						element.remove();
						scope.$destroy;
					}
				}
			}
		}
	);
	*/
/*
	*/
