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
	if (req.body.details != undefined) {
		console.log(req.body.details);
	}
	else {
		console.log('No vis data');
	}
	*/
			/*
			*/
	var details = req.body.details;
	Photo.findById(req.body.photoid, 'critiques', function (err, photo1) {
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
					//var numCrits = photo2.critiques.length;
					//var newCrit = photo2.critiques[numCrits - 1];
					var thisCrit = photo2.critiques.pop();
					if (details != undefined) {
						details.forEach( function (detail) {
							Photo.findOneAndUpdate({ 'critiques._id' : thisCrit._id },
								{ '$push' : {
									'critiques.$.details' : 
										{xCoord: detail.xCoord, yCoord: detail.yCoord, comment: detail.comment}
									}
								}, 
								function (err, photo3) {
									if (err) {
										console.log(err);
									}
								}
							);
						});//forEach
						
					}//if details
					res.json(thisCrit);
					console.log(thisCrit);
					User.addToArray('critiques', req.session.username, photo2._id);
				}// else photo2
			/*
				else {
					var thisCrit = {
						critique: photo2.critiques.pop(),
						details: details
					}
					*/
			});// photo1.save
		}// else photo1
	});// Photo.findById
}

