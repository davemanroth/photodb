angular.module('photoapp', ['ngRoute', 'photoCtrl', 'userCtrl', 'feedbackCtrl'])
	.config( function($routeProvider, $locationProvider, $httpProvider) {

		// check if the user is connected
		var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
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
						$rootScope.showMessage = true;
						$rootScope.message = 'You need to log in';
						$timeout( function () {
							deferred.reject();
						}, 0);
						$location.url('/');
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
				templateUrl: '/partials/home'
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

	.controller('LoginController', ['$scope', '$http', '$location', '$rootScope',
		function ($scope, $http, $location, $rootScope) {
			$scope.login = {};
			$scope.login.error, $rootScope.showMessage = false;

			/*
				*/
			if ($scope.login.user === undefined) {
				$http.get('/api/users/checkLoggedin')
					.success( function (user) {
						if (user !== '0') {
							$scope.login.user = user.username;
							$scope.login.loggedin = true;
						}
						else {
							$scope.login.loggedin = false;
						}
					})
					.error( function (error) {
						console.log('Error: ' + error);
					});
			}

			$scope.login.showLogin = function () {
				$scope.login.navLoginShow = !$scope.login.navLoginShow;
			}

			$scope.login.signIn = function () {
				var data = {
					username : $scope.login.username,
				  password : $scope.login.password
				}
				/*
				console.log(data);
					*/
				$http.post('/api/users/authenticate', data)
					.success( function (user) {
						$scope.login.user = user.username;
						$scope.login.loggedin = true;
						$scope.login.navLoginShow = false;
						/*
						*/
					})
					.error( function (error) {
						console.log(error);
					});
			}

			$scope.login.logout = function () {

				$http.post('/api/users/logout')
					.success( function(data) {
						$scope.login.user = undefined;
						$scope.login.loggedin = false;
						$location.path('/');
					})
					.error( function(data) {
						console.log(data);
					});
			}
		}
	])

	.directive('login', 
		function () {
			return {
				replace: true,
				restrict: 'E',
				templateUrl: '/partials/login.jade'
			}
		}
	)


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

	
			
