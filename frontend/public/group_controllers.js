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

			$scope.groupList.requestJoin = function (creator, sef_name) {
				$http.get('/api/users/checkLoggedin')
					.success( function (user) {
						if (user === '0') {
							messageCenterService.add(
								'warning',
								'You need to log in to join a group',
								{ timeout : 3000 }
							);
						}
						else {
				/*
							console.log(user);
					*/
							var joinInfo = {
								creator : creator,
								sef_group_name: sef_name,
								requester : user.username
							};

							$http.post('/api/groups/request', joinInfo)
								.success( function (data) {
									messageCenterService.add(
										'success',
										'Your join request has been sent',
										{ timeout : 3000 }
									);
									console.log(data);
								})
								.error( function (err) {
									console.log(err);
								});
						}
					})
			}
		}
	]);
