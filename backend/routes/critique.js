/**
 * Critique router
 */
var Photo = require('../models/photo').Photo;
var User = require('../models/user').User;

/*
exports.feedbackForm = function (req, res) {
	res.render('partials/feedback');
}
*/

/*
*/
exports.feedbackSubmit = function (req, res) {
	//console.log(req.body);
	var details = req.body.details;
	Photo.findById(req.body.photoid, 'critiques details', function (err, photo) {
		if (err) {
			console.log(err);
		}
		else {
			photo.critiques.push({
				username: req.session.username,
				like: req.body.like,
				improved: req.body.improved,
			});
			// add vis feedback data if there is any
			if (details.length > 0 ) {
				details.forEach( function (detail) {
					photo.details.push({
						username: req.session.username,
						xCord: detail.xCoord,
						yCord: detail.yCoord,
						comment: detail.comment
					});
				});
			}
			/*
			*/
			photo.save(function (err, photo) {
				if (err) {
					console.log(err);
				}
				else {
					User.addToArray('critiques', req.session.username, photo._id);
					res.json(photo.critiques.pop());
					console.log('Added critique to ' + req.session.username + '\'s account');
					//console.log(photo.critiques.details);
				}
			});
		}
	});
}

