(function ($) {
	var login = $('#login'), loggedIn = $('#loggedin'),
               logout = $('#logout'), loginDiv = $('#loginDiv'), 
               logoutDiv = $('#logoutDiv');

	logout.on('click', function (e) {
		window.location.href = '/logout';
		/*
		$.ajax({
			url: '/logout',
			type: 'get',
			success: function (data) {
				console.log('SUCCESS!!');
			}
			error: function () {
				console.log('ERROR!');
			}
		});
		*/
	});

	login.on('click', function (e) {
		var username = $('#username').val(), password = $('#password').val();
		//console.log(strings);
		/*
		*/
		$.ajax({
			url: '/login',
			type: 'post',
			dataType: 'json',
			data: {username: username, password: password},
			error: function () {
				console.log(data.error);
			},
			success: function (data) {
				/*
				var message = '';
				if(isValid(data)) {
					message = 'Welcome, ' + data[0].username + '!'
				} else {
					message = 'There is a problem with your username and password. Please try again';
				}
				loggedIn.show().append(message);
				*/
			}
		});

		var isValid = function (data) {
			return data[0] != undefined;
		}
	});
})(jQuery);
