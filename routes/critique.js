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
	var newCrit = new Critique({
		userid: req.session.userid,
		photoid: req.body.photoid,
		like: req.body.like,
		improved: req.body.improved
	});
	
	newCrit.save( function (err, crit) {
		if(!err) {
			Photo.addToArray('critique', req.body.photoid, crit._id);
		}
		else {
			console.log(err);
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
