angular.module('photoapp', ['ngRoute', 'photoCtrl', 'userCtrl', 'feedbackCtrl'])
	.config( function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/photos/all', {
				templateUrl: '/partials/photos_all',
				controller: 'PhotoListController'
			})
			.when('/photos/add', {
				templateUrl: '/partials/photos_add',
				controller: 'PhotoUploadController'
			})
			.when('/photos/:id', {
				templateUrl: '/partials/photos_detail',
				controller: 'PhotoDetailController'
			})
			.when('/users/signup', {
				templateUrl: '/partials/signup',
				controller: 'UserAddController'
			})
			.when('/users/:username', {
				templateUrl: '/partials/user',
				controller: 'UserController'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	})


	.directive('fileModel', ['$parse',
		function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;

					element.bind('change', function () {
						scope.$apply( function () {
							modelSetter(scope, element[0].files[0]);
						});
					});
				}
			};
		}
	]);

	
			
