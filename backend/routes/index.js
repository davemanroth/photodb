
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
		username: req.session.username,
		userid: req.session.userid
	});
};
