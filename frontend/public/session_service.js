angular.module('SessionService', [])
	.factory('sessServ', function ($http) {
		return {
			getUser: function () {
				$http.get('/api/users/checkloggedin')
					.success( function (user) {
						if (user !== '0') {
							return user.username;
						}
						else {
							return false;
						}
					})
					.error( function (error) {
						console.log('error: ' + error);
					});
			 }
		}
	});
