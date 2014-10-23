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

					if (visData != undefined) {
						visData.forEach( function (detail) {
							photo2.critiques[details].push({
								xCoord: detail.x,
								yCoord: detail.y,
								comment: detail.comment
							});
						});
						photo2.save(function (err, photo3) {
							if (err) {
								console.log(err);
							}
							else {
								thisCrit = photo3.critiqes.pop();
								res.json(thisCrit);
								console.log(thisCrit);
								User.addToArray('critiques', req.session.username, photo3._id);
							}
						});// photo2.save
					}//if visData

					else {
						res.json(thisCrit);
						console.log(thisCrit);
						User.addToArray('critiques', req.session.username, photo3._id);
					}// else visData
				}// else photo2
			/*
				else {
					var thisCrit = {
						critique: photo2.critiques.pop(),
						details: visData
					}
					*/
			});// photo1.save
		}// else photo1
	});// Photo.findById
}

