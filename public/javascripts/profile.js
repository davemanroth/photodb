(function ($) {
	var input_div = $('#group-input');
	var input = $('#group');
	input_div.hide();
	$('#group-buttons button').on('click', function (e) {
		input_div.fadeIn();
	});
})(jQuery);
