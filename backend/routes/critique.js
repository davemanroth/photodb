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
	/*
	if (req.body.visData != undefined) {
		console.log(req.body.visData);
	}
	else {
		console.log('No vis data');
	}
	*/
			/*
			*/
	var visData = req.body.visData;
	Photo.findById(req.body.photoid, 'critiques details', function (err, photo1) {
		if (err) {
			console.log(err);
		}
		else {
			photo1.critiques.push({
				username: req.session.username,
				like: req.body.like,
				improved: req.body.improved,
			});
			var numCrits = photo1.critiques.length;
			var newCrit = photo1.critiques[numCrits - 1];
			if (visData != undefined) {
				visData.forEach( function (detail) {
					photo1.details.push({
						xCoord: detail.x,
						yCoord: detail.y,
						comment: detail.comment,
						critique: newCrit._id
					});
				});
			}
			/*
			*/
			photo1.save(function (err, photo2) {
				if (err) {
					console.log(err);
				}
				else {
					res.json(photo2.critiques.pop());
					User.addToArray('critiques', req.session.username, photo2._id);
				}
			});// photo.save
		}// else
	});// Photo.findById
}

