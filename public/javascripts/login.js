(function ($) {
	var login = $('#login'), loggedIn = $('#loggedin'),
               logout = $('#logout'), loginDiv = $('#loginDiv'), 
               logoutDiv = $('#logoutDiv');
	
	var error = function (mssg) {
		var err = '<h3>Error!</h3>';
		err += '<p>' + mssg + '</p>';
		$('#mssg').append(err).fadeIn();
	}

	logout.on('click', function (e) {
		window.location.href = '/logout';
	});

	login.on('click', function (e) {
		var username = $('#username').val(), password = $('#password').val();
		$.ajax({
			url: '/login',
			type: 'post',
			dataType: 'json',
			data: {username: username, password: password},
			error: function (data) {
				console.log(data.error);
			},
			success: function (data) {
				if (data == '') {
					error('No user by that name, please try again');
				}
				else {
					$('#mssg').hide();
					loginDiv.hide();
					logoutDiv.show();
// This is a simple fix for refreshing page to get up to date data.
// May change this sometim in the future in favor of something that 
// does not reload the whole page.
					window.location.reload();
				}
			}
		});

		var isValid = function (data) {
			return data[0] != undefined;
		}
	});
})(jQuery);
