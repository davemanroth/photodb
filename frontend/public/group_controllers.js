angular.module('groupCtrl', [])
	.controller('GroupDetailController', ['$scope', '$http', '$routeParams',
		function ($scope, $http, $routeParams) {
			$scope.groupDetail = {};
			$http.get('/api/groups/' + $routeParams.sefname)
				.success( function (data) {
					$scope.groupDetail.group = data.group;
					$scope.groupDetail.photos = data.photos;
				})
				.error( function (err) {
					console.log(err);
				});
		}
	])
	.controller('GroupListController', 
		[
			'$scope', 
			'$http', 
			'messageCenterService',

		function ($scope, $http, messageCenterService) {
			$scope.groupList = {};

			$http.get('/api/groups_all')
				.success( function (data) {
					$scope.groupList.groups = data.groups;
				})
				.error( function (err) {
					console.log(err);
				});

			$scope.groupList.isMemberOf = function (group) {
				return false;
			}

			$scope.groupList.requestJoin = function (creator, sef_name) {
				var joinInfo = {
					creator : creator,
					sef_group_name: sef_name,
					requester : $scope.login.user,
				};

				$http.post('/api/groups/request', joinInfo)
					.success( function (data) {
						messageCenterService.add(
							'success',
							'Your join request has been sent',
							{ timeout : 3000 }
						);
					})
					.error( function (err) {
						console.log(err);
					});
			}
		}
	]);
