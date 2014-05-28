/**
 * Critique router
 */
var Photo = require('../models/photo').Photo;
var Critique = require('../models/critique').Critique;
//var easyimage = require('easyimage');
//var gm = require('gm').subClass({ imageMagick: true });;
//var fs = require('fs');

exports.feedbackForm = function (req, res) {
	res.render('partials/feedback');
}

exports.feedbackSubmit = function (req, res) {
	//console.log(req.body);
	Critique.create({
		userid: req.session.userid,
		photoid: req.body.photoid,
		like: req.body.like,
		improved: req.body.improved
	}, function (err, crit) {
			if(!err) {
				Photo.findOne({
					_id: req.body.photoid}, function (err, photo) {
						if(!err) {
							photo.critiques.push(crit._id);
							photo.save(function (err, photo) {
								if(!err) {
									console.log('Photo record updated');
								}
								else {
									console.log(err);
								}
							});//Photo save
						}
						else {
							console.log(err);
						}
					}// Photo find
				);
				res.json({user: req.session.username, date: Date.now});
				console.log('Critique created');
			}
			else {
				console.log(err);
			}
	});// Crit create
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
