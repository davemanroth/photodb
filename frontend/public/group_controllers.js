angular.module('groupCtrl', [])
	.controller('GroupDetailController', ['$scope', '$http', '$routeParams',
		function ($scope, $http, $routeParams) {
			$http.get('/api/groups/' + $routeParams.sefname)
				.success( function (data) {
					$scope.group = data.group;
				})
				.error( function (err) {
					console.log(err);
				});
		}
	])
	.controller('GroupListController', ['$scope', '$http', 
		function ($scope, $http) {
			$http.get('/api/groups_all')
				.success( function (data) {
					$scope.groups = data.groups;
				})
				.error( function (err) {
					console.log(err);
				});
		}
	]);
