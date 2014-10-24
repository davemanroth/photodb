angular.module('feedbackCtrl', [])

	.controller('FeedbackController', ['$scope', '$http', '$routeParams', 
		function ($scope, $http, $routeParams) {
			$scope.sortField = '-date_posted';
			$scope.visStorage = [];

			$scope.visual, $scope.feedbackArea, 
			$scope.visEnabled = false;
			$scope.feedbackOption = true;

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

			$scope.showHideVis = function ($event, details) {
				var checkbox = $event.target;
				$scope.visEnabled = checkbox.checked ? true : false;
				$scope.$broadcast('visChecked', checkbox, details);
			}

			$scope.$watch('visData', function (newData) {
				if (newData !== undefined) {
					$scope.visStorage.push(newData);
				}
			});

			$scope.addFeedback = function (feedback) {
				var data = {
					photoid: $routeParams.id,
					like: feedback.like,
					improved: feedback.improved,
				};
				if ($scope.visStorage.length > 0) {
					data.details = $scope.visStorage;
				}
				$http.post('/api/critiques/add', data)
					.success( function (retData) {
						retData.details = data.details;
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
			$scope.$on('visChecked', function (e, checkbox, details) {
// first check if any data is being passed in "details" arg
				if (details != undefined && details.length > 0) {
					if (checkbox.checked) {
						$scope.$emit('visDataAdded', details, saved = true);
					}
					else {
						console.log('Markers need to be removed');
					}
				}
// set vis feedback area to display elements according to which checkbox
// was activated
				switch (checkbox.name) {
					case 'new-vis' :
						$scope.newVis = !$scope.newVis;
						$scope.savedVis = false;
						break;
					case 'saved-vis' :
						$scope.savedVis = !$scope.savedVis;
						$scope.newVis = false;
						break;
				}
			});

			$scope.$on('visDataAdded', function (e, data, saved) {
				if (!saved) {
					$scope.visData = data;
				}
			});
			/*
			*/

			/*
			this.saveVis = function (data) {
				$scope.visStorage.push(data);
				console.log($scope.visStorage);
			}
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
							xCoord: e.pageX,
							yCoord: e.pageY
						}
						newScope.$broadcast('setCoords', coords);
					});
				}
			}
		}
	)

	.directive('visNew', 
		function () {
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
							xCoord: marker[0].offsetLeft,
							yCoord: marker[0].offsetTop,
							comment: scope.commentText
						};
						//visCtrl.saveVis(data);
						scope.$emit('visDataAdded', data, saved = false);
						marker.remove();
						element.remove();
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
						var left = coords.xCoord - element.width() / 2;
						var top = coords.yCoord - element.height() / 2;
						element.css({top: top + 'px', left: left + 'px'});
					});
				}
			}
		}
	)

	.directive('visSavedArea',
		function ($compile) {
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					scope.$on('visDataAdded', function (e, data, saved) {
						/*
						*/
						var saveScope = scope.$new(true);
						var mark = '<vis-marker class="saved-marker" ng-click="showComment()" />';
						var comment = '<div class="absolute comment" ng-show="show" ng-model="show">{{comment}}</div>';

						var populateElements = function (data, mark, comment) {
							// compile and insert saved marker, comment
							angular.forEach({mark: mark, comment: comment}, function (val, key) {
								val = $compile(val)(saveScope);
								if (key == 'mark') {
									val.css({top: data.yCoord, left: data.xCoord});
								}
								else {
									val.css({top: data.yCoord + 40, left: data.xCoord});
								}
								saveScope.comment = data.comment;
								element.append(val);
							});// angular.forEach
						}

						if (saved) {
							for (var i = 0; i < data.length; i++) {
								populateElements(data[0], mark, comment);
							}
						}
						else {
							populateElements(data, mark, comment);
						}

						saveScope.show = false;

						saveScope.showComment = function () {
							saveScope.show = !saveScope.show;
						}
						scope.savedVis="true";
					});// scope.$on
				}
			}
		}
	);

