(function ($) {
	var list = $('#group-listing');
	var group = $('#group-input').html();
	$('#group-submit').on('click', function () {
		if (group == '') {
			console.log('Enter a group!');
		}
		else {
			$.ajax({
				url: '/groups/add',
				type: 'post',
				data: {group: group},
				dataType: 'json'
				success: function (resp) {
					if (resp.error) {
						console.log(resp.error);
					}
					else {
						console.log('Group added!');
						var newGroup = package(group);
						list.append(newGroup);
					}
				}// success
			});// ajax
		}// else
		var package = function (group) {
			return '<a href="#" class="group">' group + '</a>';
		}
})(jQuery);
