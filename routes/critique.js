/**
 * Critique router
 */
var Photo = require('../models/photo').Photo;

exports.feedbackForm = function (req, res) {
	res.render('partials/feedback');
}

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
					User.addToArray('critiques', req.session.userid, photo.critiques._id);
					console.log('Added critique to ' + req.session.username + '\'s account');
				}
			});
		}
	});
}

/*
exports.photoAddForm = function (req, res) {
	Category.find({}, function (err, categories) {
		if (!err) {
			res.render('addphoto', {
				title: 'Upload a photo', 
				categories: categories,
				userid: req.session.userid
			});
		}
		else {
			console.log(err);
		}
	});
}
*/
