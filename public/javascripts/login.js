(function ($) {
	var submit = $('#submit'), loggedIn = $('#loggedin');

	submit.on('click', function (e) {
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
				var message = '';
				if(isValid(data)) {
					message = 'Welcome, ' + data[0].username + '!'
				} else {
					message = 'There is a problem with your username and password. Please try again';
				}
				loggedIn.show().append(message);
			}
		});

		var isValid = function (data) {
			return data[0] != undefined;
		}
	});
})(jQuery);
