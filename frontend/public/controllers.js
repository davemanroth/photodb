angular.module('photoCtrl', [])

// Photo List
	.controller('PhotoListController', ['$scope', '$http', 
		function($scope, $http) {
			$scope.title = 'Photo gallery';
			/*
			*/
			$http.get('/api/photos_all')
			.success( function(data, status, header, config) {
				$scope.photos = data.photos;
			})
			.error( function(data, status, header, config) {
				$scope.photos = 'Error!';
				$scope.error = data.photos;
			});
		}
	])
			/*
			*/

// Photo upload
	.controller('PhotoUploadController', ['$scope', '$http', 
		function($scope, $http) {}
	])

// Photo detail
	.controller('PhotoDetailController', ['$scope', '$http', '$routeParams', 
		function($scope, $http, $routeParams) {
			$http.get('/api/photos/' + $routeParams.id)
			.success( function(data, status, header, config) {
				$scope.photo = data.photo;
				console.log(data.photo);
				$scope.processFeedback = function() {
					var output = 'Liked: ' + $scope.like;
					output += '\nImproved: ' + $scope.improved;
					console.log(output);
				};
			})
			.error( function(data, status, header, config) {
				$scope.photo = 'Error!';
				$scope.error = data.photo;
			});
		}
	]);
