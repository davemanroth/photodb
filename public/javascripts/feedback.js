(function ($) {
	var feedback = $('#feedback');
	$('#crit-sub').on('click', function () {
		$.ajax({
			url: '/critique/add',
			type: 'get',
			dataType: 'html',
			success: function (data) {
				if (data != '') {
					console.log('Success!');
					$(feedback).append(data);
					feedbackFunctionality(data);
				}
				else {
					console.log(data.error);
				}
			}
		});
	});

	var feedbackFunctionality = function (data) {
		$('#cancel').on('click', function () {
			console.log('Cancel clicked!');
			$(feedback).children().remove();
		});
	}

})(jQuery);
