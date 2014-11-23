angular.module('feedbackCtrl', [])

	.controller('FeedbackController', 
		[
			'$scope', 
			'$http', 
			'$routeParams', 
			'$location',
			'sessServ',
			'messageCenterService', 

		function ($scope, $http, $routeParams, $location, sessServ, messageCenterService) {
			$scope.sortField = '-date_posted';
			$scope.visStorage = [];
			$scope.visual, $scope.feedbackArea, 
			$scope.visEnabled = false;
			$scope.feedbackOption = true;

			$scope.showHideFeedback = function ($event) {
				// First check if the user is logged in
				
				var option = $event.target.id;
// This checkbox variable is a throwaway, only set so we can borrow the same
// 'visChecked' broadcast event. In this case we're using it to remove
// all visFeedback elements when either cancel or save is clicked
				var checkbox = {};
				checkbox.name = 'cancel-save';
				switch (option) {
					case 'addFeedback':
					case 'cancelFeedback':
						$scope.feedbackArea = false;
						$scope.feedbackOption = true;
						$scope.$broadcast('visChecked', checkbox, false);
						break;
					case 'showFeedback':
						$http.get('/api/users/checkLoggedin')
							.success( function (user) {
								if (user === '0') {
									messageCenterService.add(
										'warning',
										'You need to log in to submit feedback'
									);
								}
								else {
									$scope.feedbackArea = true;
									$scope.feedbackOption = false;
								}
							})
							.error( function (error) {
								console.log('Error: ' + error);
							});
						break;
				}
			}

			$scope.showHideVis = function ($event, critique) {
				var checkbox = $event.target;
				$scope.visEnabled = checkbox.checked ? true : false;
				$scope.$broadcast('visChecked', checkbox, critique);
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
			$scope.$on('visChecked', function (e, checkbox, critique) {
// set vis feedback area to display elements according to which checkbox
// was activated. The 'cancel-save' case is included even though it doesn't
// technically originate from a checkbox
				switch (checkbox.name) {
					case 'new-vis' :
						$scope.newVis = !$scope.newVis;
						$scope.savedVis = false;
						break;
					case 'saved-vis' :
						$scope.savedVis = !$scope.savedVis;
						$scope.newVis = false;
						break;
					case 'cancel-save' :
						$scope.newVis = false, $scope.savedVis = false;
						$element.children('vis-new').children().remove();
						$element.children('vis-saved-area').children().remove();
						break;
				}

// first check if critique is defined and if any data is being passed in "details" property
				if (critique != undefined && critique.details != undefined && critique.details.length > 0) {
					if (checkbox.checked) {
						$scope.$emit('visDataAdded', critique, saved = true);
					}
					else {
// remove all vis elements from screen that correspond to feedback's author. I
// used the author's username as an identifier, implemented as a  class in 
// the elements 
						$element.find('vis-saved-area').children('.' + critique.username).remove();
					}
				}

			});

			$scope.$on('visDataAdded', function (e, data, saved) {
				if (!saved) {
					$scope.visData = data;
				}
			});
			/*
			*/
		}
	])


	.directive('visFeedback', 
		function ($compile, $window) {
			return {
				restrict: 'E',
				controller: 'VisController',
				link: function (scope, element, attr) {
					var vc = '<vis-container>';	
					var width=0, height=0, img = element.siblings('img');
					var win = angular.element($window);

					var visResize = function () {
						width = img.width();
						height = img.height();
						element.height(height + 'px').width(width + 'px');
					}

					vc = $compile(vc)(scope);
					element.prepend(vc);
// match visFeedback's dimensions to photo's
					img.on('load', function () {
						visResize();
						scope.imgSize = { width : img.width(), height : img.height()};
						//console.log(img.offset());
					});

					win.resize( function () {
						visResize();
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
				template: '<div class="vis-container relative full" ng-module="imgSize" ng-show="newVis"></div>',
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
						};
						var newCoords = {
							xCoord : ( (e.offsetX / scope.imgSize.width) * 100 ) - 2,
							yCoord : ( (e.offsetY / scope.imgSize.height) * 100 ) - 2
						};
						//console.log(newCoords);
						//console.log([e.offsetX, e.offsetY]);
						newScope.$broadcast('setCoords', newCoords);
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
						/*
						var data = {
							xCoord: marker[0].offsetLeft,
							yCoord: marker[0].offsetTop,
							comment: scope.commentText
						};
						*/
						var data = {
							xCoord: marker[0].style.left.slice(0, -1),
							yCoord: marker[0].style.top.slice(0, -1),
							comment: scope.commentText
						};
						//console.log(data);
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
// Subtract 2% from each coordinate so marker appears centered on mouse cursor
						var left = coords.xCoord;
						var top = coords.yCoord;
						element.css({top: top + '%', left: left + '%'});
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
						console.log(data);
						*/
						var mark = '<vis-marker class="saved-marker" ng-click="showComment()" />';
						var comment = '<div class="absolute comment" ng-show="show" ng-model="show">{{comment}}</div>';

						var populateElements = function (iscope, data, mark, comment, username) {
// compile and insert saved marker, comment
							angular.forEach({mark: mark, comment: comment}, function (val, key) {
								val = $compile(val)(iscope);
								if (key == 'mark') {
									val.css({top: data.yCoord + '%', left: data.xCoord + '%'});
								}
								else {
									val.css({top: data.yCoord + 9 + '%', left: data.xCoord + '%'});
								}
								if (username) {
									val.addClass(username);
								}
								iscope.comment = data.comment;
								element.append(val);
							});// angular.forEach
						}

// I know it's a bit inelegant but this is the only way I found to avoid scope
// collision between each saved vis feedback elements while sharing creation
// functionality for newly created vis feedback elements and recreation of elements 
// from stored vis feedback data pulled from MongoDb
						if (saved) {
							data.details.forEach( function (el) {
								var saveScope = scope.$new(true);
								populateElements(saveScope, el, mark, comment, data.username);
								saveScope.show = false;
								saveScope.showComment = function () {
									saveScope.show = !saveScope.show;
								}
							});
						}
						else {
							var saveScope = scope.$new(true);
							populateElements(saveScope, data, mark, comment, false);
							saveScope.show = false;
							saveScope.showComment = function () {
								saveScope.show = !saveScope.show;
							}
						}


						scope.savedVis="true";
					});// scope.$on
				}
			}
		}
	);

