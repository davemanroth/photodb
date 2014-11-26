angular.module('photoapp', ['ngRoute', 'loginCtrl', 'photoCtrl', 'userCtrl', 'feedbackCtrl', 'MessageCenterModule'])
	.config( function($routeProvider, $locationProvider, $httpProvider) {

		// check if the user is connected
		var checkLoggedin = function ($q, $timeout, $http, $location, messageCenterService) {
						
			// initialize a new promise
			var deferred = $q.defer();

			// make AJAX call to check if user is logged in
			$http.get('/api/users/checkLoggedin')
				.success( function (user) {
			// Authenticated
					if (user !== '0') {
						$timeout(deferred.resolve, 0);
					}
					else {
						
						$timeout( function () {
							deferred.reject();
						}, 0);
						$location.url('/');
						messageCenterService.add(
							'warning', 
							'You need to log in to view this area', 
							{ status : messageCenterService.status.next }
						);
						
					}
				});
				
			return deferred.promise;
		}

		// Interceptor for AJAX errors
		$httpProvider.responseInterceptors.push( function ($q, $location) {
			return function (promise) {
				return promise.then(
					function (response) {
						return response;
					},
					function (response) {
						if (response.status === 401) {
							$location.url('/');
						}
						return $q.reject(response);
					}
				);//then
			}//promise callback
		});

		$routeProvider
			.when('/', {
				templateUrl: '/partials/home',
			})
			.when('/photos/all', {
				templateUrl: '/partials/photos_all',
				controller: 'PhotoListController'
			})
			.when('/photos/add', {
				templateUrl: '/partials/photos_add',
				controller: 'PhotoUploadController',
				resolve: { loggedin : checkLoggedin }
			})
			.when('/photos/:id', {
				templateUrl: '/partials/photos_detail',
				controller: 'PhotoDetailController'
			})
			.when('/users/logout', {
				controller: 'LoginController',
			})
			.when('/users/signup', {
				templateUrl: '/partials/signup',
				controller: 'UserAddController'
			})
			.when('/users/:username', {
				templateUrl: '/partials/user',
				controller: 'UserController',
				resolve: { loggedin : checkLoggedin }
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	})

	.run(['$location', '$rootScope', 
		function ($location, $rootScope) {
			$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
				$rootScope.bkgrd = $location.url() == '/' ? 'home-bkgrd' : '';
			});
		}
	]);
