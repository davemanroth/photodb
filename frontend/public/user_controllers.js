angular.module('userCtrl', [])

	.controller('UserPhotoEditController', ['$scope', '$http',
		function($scope, $http) {
			$scope.updatePhotoEdits = function () {
				$http.put('/api/editphoto/', $scope.photo) 
					.success(function(data) {
						console.log(data);
					})
					.error(function(err) {
						console.log(err);
					});
			}//updatePhotoEdits
		}//controller
	])

	.controller('UserController', ['$scope', '$http', '$routeParams',
		function($scope, $http, $routeParams) {
			$http.get('/api/users/' + $routeParams.username)
				.success( function(data) {
					$scope.user = data.user;
					$scope.filters = data.filters;
				})
				.error( function(data) {
					$scope.error = data.user;
				});
		}
	])

	.controller('UserAddController', ['$scope', '$http', '$location',
		function ($scope, $http, $location) {
			$scope.addUser = function() {
				var user = {
					pic: $scope.profile_image,
					username: $scope.username,
					password: $scope.password,
					email: $scope.email,
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					bio: $scope.bio
				};

				$http.post('/api/users/signup', user, 
					{
						transformRequest: function (user) {
							var fd = new FormData();
							for(var key in user) {
								fd.append(key, user[key]);
							}
							return fd;
						},
						headers: {'Content-Type' : undefined}
					})
				.success( function(data) {
					$location.path('/users/' + user.username);
				} );
			}
		}
	]);
