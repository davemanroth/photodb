/**
 * Photo router
 */
var Photo = require('../models/photo').Photo;
var User = require('../models/user').User;
var Group = require('../models/group').Group;
var Category = require('../models/category').Category;
var Filters = require('../models/category').Filters;
var gm = require('gm').subClass({ imageMagick: true });;
var fs = require('fs');

var thumbName = function (oldName) {
	return oldName.split('.').join('_thumb.');
}

exports.photoSubmitSetup = function (req, res) {
	Category.find({}, function (err, categories) {
		if (!err) {
			var data = {
				categories : categories,
				filters : Filters
			};
			if (req.user.groups.length > 0) {
				Group.find({ _id : { $in : req.user.groups } }, 
					function (err, groups) {
						if (err) {
							console.log(err);
						}
						else {
							data.groups = groups;
							res.json(data);
						}
					});//Group.find
			}//if groups.lenth > 0
			else {
				res.json(data);
			}
		}
		else {
			console.log(err);
		}
	});
}

// Form to add a photo
exports.categories = function (req, res) {
	Category.find({}, function (err, categories) {
		if (!err) {
			res.json({categories: categories, filters:Filters});
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
exports.photoSubmitAction = function (req, res, next) {
	var submitted = req.files.photo;
	var tmpPath = submitted.path;
	var fullRes = '/photo_uploads/' + submitted.name;
	var thumb = '/photo_uploads/thumbs/' + thumbName(submitted.name);
	var fullResDir = './frontend/public' + fullRes;
	var thumbDir = './frontend/public' + thumb;
	var MAX_WIDTH = 1170;

	var pushArrays = function (str, field) {
		var arr = str.split(',');
		for (var i = 0; i < arr.length; i++) {
			field.push(arr[i]);
		}
	}
	
// First create a model and populate with user submitted values
	var newPhoto = new Photo({
		title: req.body.title,
		author: req.user._id,
		path: fullRes,
		thumb: thumb,
		writeup: req.body.writeup,
		date_uploaded: Date.now(),
		camera: req.body.camera,
		shutter: req.body.shutter,
		fstop: req.body.fstop,
		iso: req.body.iso,
		flash: req.body.flash
	});
	
	if (req.body.category.length > 0) {
		pushArrays(req.body.category, newPhoto.category);
	}
	
//Check if there are any group restrictions and if so, add
//them to the group_restrict array field in newPhoto model
	/*
	*/
	if (req.body.groups_restrict !== undefined && 
			req.body.groups_restrict.length > 0) {
		pushArrays(req.body.groups_restrict, newPhoto.groups_restrict);
	}



// Now check width of photo, resize if necessary, then rename and 
// create a thumb of uploaded image
	gm(tmpPath).size( function (err, size) {
		if (!err) {
			//console.log(size);
			if (size.width > MAX_WIDTH) {
				gm(tmpPath).resize(MAX_WIDTH).write( tmpPath, function (err) {
					if (!err) {
						console.log('Image successfully resized');
						renameAndCreateThumb(finalSave);
					}
					else {
						console.log(err);
					}// resize and write
				});
			}
			else {
				renameAndCreateThumb(finalSave);
			}//If width greater than max width
		}
		else {
			console.log(err);
		}// If no size error
		
	});// gm size function

// Rename the uploaded image and create a corresponding thumbnail
	function renameAndCreateThumb(finalSave) {
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
				finalSave();
			}
			else {
				console.log(err);
			}
		});
	}

// Save the model into MongoDB and add the new photos to the user's db entry
	function finalSave() {
		newPhoto.save( function (err, photo) {
			if(!err) {
				User.addToArray('photos', req.user.username, photo._id);
				res.send('Successful upload!');
			}
			else {
				console.log(err);
			}
		});
	}
	/*
	*/
}

// Photo gallery
exports.photosAll = function (req, res) {
	Photo.find({ groups_restrict : { $size : 0 } })
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

