angular.module('userCtrl', [])

	.controller('UserController', ['$scope', '$http', '$routeParams',
		function($scope, $http, $routeParams) {
			$http.get('/api/users/' + $routeParams.username)
				.success( function(data) {
					$scope.user = data.user;
				})
				.error( function(data) {
					$scope.error = data.user;
				});
		}
	])

	.controller('UserAddController', ['$scope', '$http',
		function ($scope, $http) {
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
				.success( function() {} );
			}
		}
	]);
