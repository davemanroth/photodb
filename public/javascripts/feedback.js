(function ($) {
	var feedback = $('#feedback');
	var critArea = $('#critique-area');
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
				dataType: 'json',
				data: {like: like, improved: improved, photoid: photoid},
				success: function (resp) {
					if(resp.error) {
						console.log(resp.error);
					}
					else {
						var crit = addCritique(like, improved, resp.user, resp.date);
						//console.log(crit);
						critArea.prepend(crit);
						$(feedback).children().remove();
					}
				}
			});
		});
	}	
	
	var addCritique = function (like, improved, user, date) {
		var output = '<div class="critique">';
		output += '<p class="question">What do you like about the photo?<br />';
		output += like + '</p>';
		output += '<p class="question">What could be improved?<br />';
		output += improved + '</p>';
		output += '<p class="author">' + user + ', ' + date + '</p>';
		output += '</div>';
		return output;
	}

})(jQuery);
