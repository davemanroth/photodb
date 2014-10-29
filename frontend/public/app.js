angular.module('photoapp', ['ngRoute', 'photoCtrl', 'userCtrl', 'feedbackCtrl'])
	.config( function($routeProvider, $locationProvider) {
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

	.controller('LoginController', ['$scope', '$http',
		function ($scope, $http) {
			$scope.login = {};
			$scope.login.error = false;
			$scope.login.nav = true;

			$scope.login.login = function ($event) {
				var loc = $event.target.name;
				switch (loc) {
					case 'nav-login':
						$scope.login.navLoginShow = !$scope.login.navLoginShow;
						break;
					case 'home-login':
						$scope.login.homeLoginShow = !$scope.login.homeLoginShow;
						break;
				}
			}

			$scope.login.signIn = function () {
				var data = {
					username : $scope.login.username,
				  password : $scope.login.password
				}
				$http.post('/api/users/authenticate', data)
					.success( function (result) {
					})
					.error( function (result) {
						$scope.login.message = result;
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

	
			
