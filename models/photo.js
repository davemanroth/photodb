/**
 * Photo model
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	_id: {type: String, default: shortid.generate()},
	title: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	path: {type: String, required: true},
	thumb: {type: String, required: true},
	date_uploaded: {type: Date, default: Date.now},
	camera: {type: String},
	shutter: {type: String},
	fstop: {type: String},
	iso: {type: String},
	flash: {type: Boolean, default: false},
	writeup: {type: String, required: true},
	access: {type: Boolean, default: false},
	views: {type: Number, required: true, default: 0},
	critiques: [CritiqueSchema],
	category: [String],
}, {collection: 'photos'});	

/**
 * critique subdocument
 */
var CritiqueSchema = new Schema({
	username: {type: String, ref: 'User'},
	date_posted: {type: Date, default: Date.now},
	like: {type: String, required: true},
	improved: {type: String, required: true},
	details: [DetailSchema]
});

// details subdocument
var DetailSchema = new Schema({
	xCoord: {type: Number, required: true},
	yCoord: {type: Number, required: true},
	notes: {type: String, required: true}
});

var Photo = mongoose.model('Photo', PhotoSchema);
module.exports = {Photo: Photo};;
