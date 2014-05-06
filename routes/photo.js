/**
 * Photo router
 */
var Photo = require('../models/photo').Photo;
var Category = require('../models/category').Category;
var fs = require('fs');

exports.photoAddForm = function (req, res) {
	Category.find({}, function (err, categories) {
		if (!err) {
			res.render('addphoto', {title: 'Upload a photo', categories: categories});
		}
		else {
			console.log(err);
		}
	});
}

exports.photoAddAction = function (req, res, next) {
	var submitted = req.files.photo;
	var tmpPath = submitted.path;
	var uploadDir = './public/photo_uploads/' + submitted.name;
	Photo.create({
		title: req.body.title,
		category: req.body.category,
		path: uploadDir,
		writeup: req.body.writeup,
		date_uploaded: Date.now(),
		access: req.body.access,
		camera: req.body.camera,
		shutter: req.body.shutter,
		fstop: req.body.fstop,
		iso: req.body.iso,
		flash: req.body.flash
	});

	fs.rename(tmpPath, uploadDir, function (err) {
		if (err) { next(err); }
		fs.unlink(tmpPath, function () {
			console.log('Image uploaded to ' + uploadDir);
		});
	});
}
