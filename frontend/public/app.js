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
	});
			
