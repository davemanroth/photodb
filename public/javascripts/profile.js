(function ($) {
	var list = $('#group-listing');
	$('#group-submit').on('click', function () {
		var group = $('#group-input').val();
//Barebone validation
		if (group == '') {
			console.log('Enter a group!');
		}
		else {
			$.ajax({
				url: '/groups/add',
				type: 'post',
				data: {group: group},
				dataType: 'json',
				success: function (resp) {
					if (resp.error) {
						console.log(resp.error);
					}
					else {
						console.log('To add: ' + group);
						var newGroup = package(group);
						list.append(newGroup);
					}
				}// success
			});// ajax
		}// else
	});// click
	var package = function (group) {
		return '<a href="#" class="group">' + group + '</a>';
	}
})(jQuery);
