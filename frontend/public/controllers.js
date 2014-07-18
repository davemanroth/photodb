angular.module('photoCtrl', [])
	.controller('PhotoListController', ['$scope', '$http', 
		function($scope, $http) {
			/*
			$http({
				method: 'GET', 
				url: 'api/photos_all'
			})
			.success( function(photos, status, header, config) {
				$scope.photos = photos;
			})
			.error( function(photos, status, header, config) {
				$scope.photos = {};
				$scope.error = photos;
			});
			*/
		}
	]);
