/**
 * Photo router
 */
var Photo = require('../models/photo').Photo;
var Category = require('../models/category').Category;
var fs = require('fs');

// Form to add a photo
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

// Process add photo form, add data to db
exports.photoAddAction = function (req, res, next) {
	var submitted = req.files.photo;
	var tmpPath = submitted.path;
	var uploadDir = '/photo_uploads/' + submitted.name;
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

// Photo gallery
exports.allPhotos = function (req, res) {
	Photo.find({}, function (err, photos) {
		if(!err) {
			res.render('gallery', {title: 'Photo gallery', photos: photos});
		}
		else {
			console.log(err);
		}
	});
}
