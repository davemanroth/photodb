/**
 * Photo router
 */
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');

exports.photoAddForm = function (req, res) {
	res.render('addphoto', {title: 'Upload a photo'});
}
