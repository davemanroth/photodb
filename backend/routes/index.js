
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index'); 
		/*
  res.render('index', { 
		username: req.session.username,
		userid: req.session.userid
	});
	*/
};

exports.partials = function(req, res) {
	console.log('Working...');
	var partial = req.params.name;
	res.render('partials/' + partial);
};
