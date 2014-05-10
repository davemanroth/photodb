
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
		title: 'Welcome to photo critique',
		username: req.session.username,
		userid: req.session.userid
	});
};
