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
			if (visData != undefined) {
				visData.forEach( function (detail) {
					photo1.details.push({
						xCoord: detail.x,
						yCoord: detail.y,
						comment: detail.comment
					});
				});
			}
			photo1.save(function (err, photo2) {
				if (err) {
					console.log(err);
				}
				else {
					res.json(photo2.critiques.pop());
					User.addToArray('critiques', req.session.username, photo2._id);
					//var newCritDets = photo2.critiques.pop();
					//var detsSize = photo2.details.length - 1;
					//console.log(photo2.critiques.lastIndexOf());
				}
			/*
					for(var i = 0; i < details.length; i++) {
						photo2.critiques._id(newCritDets._id).details.push(
							mongoose.Type.ObjectId(photo2.details[detsSize - i]._id));
					}
					photo2.save(function (err, photo3) {
						if (err) {
							console.log(err);
						}
						else {
							res.json(photo3.critiques.pop());
							User.addToArray('critiques', req.session.username, photo3._id);
						}
					});
				} //if details is not empty
			*/
					
				/*
					*/
					//console.log('Added critique to ' + req.session.username + '\'s account');
			});// photo.save
		}// else
	});// Photo.findById
}

