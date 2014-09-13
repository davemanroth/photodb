/**
 * Photo router
 */
var Photo = require('../models/photo').Photo;
var User = require('../models/user').User;
var Category = require('../models/category').Category;
var Filters = require('../models/category').Filters;
var gm = require('gm').subClass({ imageMagick: true });;
var fs = require('fs');

var thumbName = function (oldName) {
	return oldName.split('.').join('_thumb.');
}

// Form to add a photo
exports.categories = function (req, res) {
	Category.find({}, function (err, categories) {
		if (!err) {
			res.json({categories: categories});
		}
		else {
			console.log(err);
		}
	});
}

exports.photoEdit = function (req, res) {
	//console.log(req.body);
	/*
	*/
	Photo.update(
		{_id: req.body._id},
		{
			title: req.body.title,
			//category: req.body.category,
			//writeup: req.body.writeup,
			//access: req.body.access,
			camera: req.body.camera,
			shutter: req.body.shutter,
			fstop: req.body.fstop,
			iso: req.body.iso,
			//flash: req.body.flash
		},
		function(err, numAffected, resp) {
			if(err) {
				console.log(err);
			}
			else {
				console.log(resp);
				res.send('Successful update!');
			}
		}
	);
}


// Process add photo form, add data to db
exports.photoSubmit = function (req, res, next) {

	/*
	var photo = req.files.photo;
	var stuff = [photo.path, photo.name];
	console.log(stuff);
	*/
	var submitted = req.files.photo;
	var tmpPath = submitted.path;
	var fullRes = '/photo_uploads/' + submitted.name;
	var thumb = '/photo_uploads/thumbs/' + thumbName(submitted.name);
	var fullResDir = './frontend/public' + fullRes;
	var thumbDir = './frontend/public' + thumb;
	
	var newPhoto = new Photo({
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

	newPhoto.save( function (err, photo) {
		if(!err) {
			User.addToArray('photos', req.session.username, photo._id);
			res.send('Successful upload!');
		}
		else {
			console.log(err);
		}
	});
	
// Move file from temporary upload dir to photo_uploads dir
	fs.rename(tmpPath, fullResDir, function (err) {
		if (err) { next(err); console.log(err); }
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
	/*
	*/
}

// Photo gallery
exports.photosAll = function (req, res) {
	Photo.find({})
		.populate('author', 'username')
		.exec(function (err, photos) {
			if(!err) {
				Category.find({}, function (err, categories) {
					if(!err) {
						res.json({photos: photos, categories: categories, filters:Filters});
					}
					else {
						console.log(err);
					}
				});
			}
			else {
				console.log(err);
			}
	});
}

exports.photoDetail = function (req, res) {
	var id = req.params.id;
	Photo.findByIdAndUpdate({_id: id}, {$inc: {views: 1} }, function (err, photo) {
		if(!err) {
			Photo.findById({_id: photo._id})
			.populate('author', 'username')
			.exec(function (err, photo) {
				if(!err) {
					res.json({photo: photo});
				}
				else {
					console.log(err);
				}
			});
				/*
				*/
		}
		else {
			console.log(err);
		}
	});
}

