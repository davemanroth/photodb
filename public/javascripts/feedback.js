(function ($) {
	var feedback = $('#feedback');
	$('#crit-sub').on('click', function () {
		$.ajax({
			url: '/critique/add',
			type: 'get',
			dataType: 'html',
			success: function (data) {
				if (data != '') {
					$(feedback).append(data);
					feedbackFunctionality();
				}
				else {
					console.log(data.error);
				}
			}
		});
	});

	var feedbackFunctionality = function () {
		$('#cancel').on('click', function () {
			$(feedback).children().remove();
		});
		$('#submit-feedback').on('click', function () {
			var like = $('#like').val();
			var improved = $('#improved').val();
			var photoid = $('#photoid').val();
			// Do the Visual part later
			//if($('#visual').is(':checked')) {
			$.ajax({
				url: '/critique/add',
				type: 'post',
				data: {like: like, improved: improved, photoid: photoid},
				success: function (resp) {
					if(resp.error) {
						console.log(resp.error);
					}
					else {
						console.log(data);
						$(feedback).children().remove();
					}
				}
			});
		});
	}

})(jQuery);
