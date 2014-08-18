angular.module('photoapp', ['ngRoute', 'photoCtrl'])
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
			
