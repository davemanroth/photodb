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
				success: function (resp) {
					if (resp.error) {
						console.log(resp.error);
					}
					else {
						var newGroup = package(group);
						list.append(newGroup);
					}
				}// success
			});// ajax
		}// else
	});// click
	var package = function (group) {
		var package = '<div class="package">';
		package += '<a href="#" class="group">' + group + '</a>';
		package += '<a href="#" class="delete">x</a>';
		package += '</div>';
		return package;
	}
})(jQuery);
