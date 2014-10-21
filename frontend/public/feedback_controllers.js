angular.module('feedbackCtrl', [])

	.controller('FeedbackController', ['$scope', '$http', '$routeParams', 
		function ($scope, $http, $routeParams) {
			$scope.sortField = '-date_posted';

			$scope.visual, $scope.feedbackArea, 
			$scope.visEnabled, $scope.newVis,
			$scope.savedVis = false;
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

			$scope.startVis = function ($event) {
				if ($scope.visEnabled) {
					var coords = {
						x: $event.pageX,
						y: $event.pageY
					}
					$scope.$emit('startVis', coords);
				}
			}

			$scope.showHideVis = function ($event) {
				var checkbox = $event.target;
				$scope.visEnabled = checkbox.checked ? true : false;
				$scope.$broadcast('visChecked', $scope.visEnabled);
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
			var visStorage = [];
			$scope.$on('visChecked', function (e, checked) {
				$scope.newVis = checked ? true : false;
			});

			this.saveVis = function (data) {
				$scope.savedVis = true;
			}

			/*
			$scope.$watch('vfData', function (val) {
				console.log(val);
			});
			*/
		}
	])


	.directive('visFeedback', 
		function ($compile) {
			return {
				restrict: 'E',
				controller: 'VisController',
				link: function (scope, element, attr) {
					var vc = '<vis-container>';	
					var width=0, height=0, img = element.siblings('img');
					vc = $compile(vc)(scope);
					element.prepend(vc);
	// match visFeedback's dimensions to photo's
					img.on('load', function () {
						width = img.width();
						height = img.height();
						vc.height(height + 'px').width(width + 'px');
					});

				/*
				*/
				}
			}
		}
	)
	
	.directive('visContainer',
		function ($compile) {
			return {
				restrict: 'E',
				template: '<div class="vis-container absolute" ng-show="newVis"></div>',
				replace: true,
				link: function (scope, element, attr) {
					element.bind('click', function (e) {
						var vm = '<vis-marker class="new-marker">';
						var vc = '<vis-comment>';
						var newScope = scope.$new(true);
						[vm, vc].forEach( function (el) {
							var newEl = $compile(el)(newScope);
							element.next().append(newEl);
						});
						var coords = {
							x: e.pageX,
							y: e.pageY
						}
						newScope.$broadcast('setCoords', coords);
					});
				}
			}
		}
	)

	.directive('visNew', 
		function ($compile) {
			return {
				require: '^visFeedback',
				restrict: 'E',
			}
		}
	)

	.directive('visComment', 
		function () {
			return {
				replace: true,
				restrict: 'E',
				templateUrl: '/partials/commentBox.jade',
				controller: 'VisController',
				link: function (scope, element, attrs, visCtrl) {
					scope.cancelComment = function () {
					// remove the marker
						var marker = element.prev();
						marker.remove();
						element.remove();
						scope.$destroy;
					}

					scope.submitComment = function () {
						var marker = element.prev();
						var data = {
							x: marker[0].offsetLeft,
							y: marker[0].offsetTop,
							comment: scope.commentText
						};
						visCtrl.saveVis(data);
						scope.$emit('visData', data);
						marker.remove();
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
				replace: true,
				template: '<a class="vis-marker absolute" href="#"></a>',
				restrict: 'E',
				link: function (scope, element, attrs) {
					scope.$on('setCoords', function (e, coords) {
						var left = coords.x - element.width() / 2;
						var top = coords.y - element.height() / 2;
						element.css({top: top + 'px', left: left + 'px'});
					});

					scope.showComment = function () {
						console.log('Marker was clicked');
					}
				}
			}
		}
	)

	.directive('visSavedArea',
		function ($compile) {
			return {
				require: '^visFeedback',
				restrict: 'E',
				link: function (scope, element, attrs) {
					scope.$on('visData', function (e, data) {
						var saveScope = scope.$new(true);
						var saved = '<vis-marker class="saved-marker" ng-click="showComment()">' +
						'</vis-marker>' +
						'<div class="absolute comment" ng-model="comment"></div>';
						saved = $compile(saved)(saveScope);
						element.append(saved);

					});
				}
			}
		}
	);


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
