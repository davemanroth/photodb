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

exports.feedbackSubmit = function (req, res) {
	//console.log(req.body);
	Photo.findById(req.body.photoid, 'critiques', function (err, photo) {
		if (err) {
			console.log(err);
		}
		else {
			photo.critiques.push({
				username: req.session.username,
				like: req.body.like,
				improved: req.body.improved
			});
			photo.save(function (err, photo) {
				if (err) {
					console.log(err);
				}
				else {
					User.addToArray('critiques', req.session.username, photo._id);
					res.send('Added critique to ' + req.session.username + '\'s account');
				}
			});
		}
	});
}

