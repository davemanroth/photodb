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
			
			/*
			*/
			photo1.save(function (err, photo2) {
				if (err) {
					console.log(err);
				}
				else {
					var newCrit = photo2.critiques.pop();
				// add vis feedback data if there is any
					if (details.length > 0 ) {
						details.forEach( function (detail) {
							/*
								*/
							photo2.details.push({
								xCord: detail.xCoord,
								yCord: detail.yCoord,
								comment: detail.comment
							});
						});
						photo2.save(function (err, photo3) {
							if (err) {
								console.log(err);
							}
							else {
								res.json(photo3.critiques.pop());
								//console.log(photo3);
								/*
								var newCritDets = photo3.critiques.pop();
								for(var i = 0; i < details.length; i++) {
									photo3.critiques._id(newCritDets._id).details.push(
										mongoose.Type.ObjectId(photo3.details[details.length - i]._id));
								}
								photo3.save( function (err, photo4) {
									if (err) {
										console.log(err);
									}
									else {
										res.json(newCritDets);
										console.log(photo4);
									}
								});
								*/
							}
						});
					} //if details is not empty
					else {
						res.json(newCrit);
						console.log(photo2);
					}
				/*
					*/
					User.addToArray('critiques', req.session.username, photo1._id);
					//console.log('Added critique to ' + req.session.username + '\'s account');
				}
			});
		}
	});
}

