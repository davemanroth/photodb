angular.module('userCtrl', [])

	.controller('UserPhotoEditController', ['$scope', '$http',
		function($scope, $http) {
			$scope.isOwner = function (user) {
				return user === $scope.login.user;
			}

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
				var extras = {};
				var user = {
					username: $scope.username,
					password: $scope.password,
					email: $scope.email,
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					bio: $scope.bio
				};

				if ($scope.profile_image !== undefined) {
					user.pic = $scope.profile_image;
					extras = {
						transformRequest: function (user) {
							var fd = new FormData();
							for(var key in user) {
								fd.append(key, user[key]);
							}
							return fd;
						},
						headers: {'Content-Type' : undefined}
					};
				}

				$http.post('/api/users/signup', user, extras)
					.success( function(data) {
						console.log(data);
						$location.path('/users/' + user.username);
						$scope.login.user = user.username;
						$scope.login.loggedin = true;
						console.log([$scope.login.user, $scope.login.loggedin]);
					})
					.error( function(data) {
						console.log(data);
					});
			}
		}
	]);
