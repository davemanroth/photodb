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
	critiques: [{type: Schema.Types.ObjectId, ref: 'Critique'}],
	category: [String],
}, {collection: 'photos'});	

var Photo = mongoose.model('Photo', PhotoSchema);
module.exports = {Photo: Photo};;
