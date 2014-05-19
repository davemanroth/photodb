/**
 * Photo router
 */
var Photo = require('../models/photo').Photo;
var Category = require('../models/category').Category;
//var easyimage = require('easyimage');
var gm = require('gm').subClass({ imageMagick: true });;
var fs = require('fs');

var thumbName = function (oldName) {
	return oldName.split('.').join('_thumb.');
}

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
	var fullRes = '/photo_uploads/' + submitted.name;
	var thumb = '/photo_uploads/thumbs/' + thumbName(submitted.name);
	var fullResDir = './public' + fullRes;
	var thumbDir = './public' + thumb;
	Photo.create({
		title: req.body.title,
		category: req.body.category,
		author: req.session.userid,
		path: fullRes,
		thumb: thumb,
		writeup: req.body.writeup,
		date_uploaded: Date.now(),
		access: req.body.access,
		camera: req.body.camera,
		shutter: req.body.shutter,
		fstop: req.body.fstop,
		iso: req.body.iso,
		flash: req.body.flash
	});

	// Move file from temporary upload dir to photo_uploads dir
	fs.rename(tmpPath, fullResDir, function (err) {
		if (err) { next(err); }
		fs.unlink(tmpPath, function () {
			console.log('Image uploaded to ' + fullResDir);
		});
	});

	// Thumbnail creation
	gm(fullResDir).resize(220, 180).write(thumbDir, function (err) {
		if (!err) {
			console.log('Thumbnail successfully created!');
		}
		else {
			console.log(err);
		}
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

exports.photoDetail = function (req, res) {
	var id = req.params.photoid;
	Photo.find({_id: id})
		   .populate('author', 'username')
			 .exec(function (err, photo) {
		if(!err) {
			res.render('detail', {photo: photo[0]});
		}
		else {
			console.log('ERROR: ' + err);
		}
	});
}

