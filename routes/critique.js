/**
 * Critique router
 */
var Photo = require('../models/photo').Photo;
var Category = require('../models/category').Category;
var Critique = require('../models/critique').Critique;
//var easyimage = require('easyimage');
//var gm = require('gm').subClass({ imageMagick: true });;
var fs = require('fs');

var thumbName = function (oldName) {
	return oldName.split('.').join('_thumb.');
}

exports.showFeedbackForm = function (req, res) {
	res.render('partials/feedback');
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
