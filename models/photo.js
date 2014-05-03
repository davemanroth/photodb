/**
 * Photo model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	title: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	path: {type: String, required: true},
	writeup: {type: String, required: true},
	date_uploaded: {type: Date, default: Date.now},
	views: {type: Number, required: true, default: 0},
	tech: [TechSchema],
	critiques: [{type: Schema.Types.ObjectId, ref: 'Critique'}],
	restriction: {type: String, required: true},
	category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
}, {collection: 'photos'});	

// Subdocument for PhotoSchema
var TechSchema = new Schema({
	camera: {type: String, required: true},
	shutter: {type: String, required: true},
	fstop: {type: String, required: true},
	iso: {type: String, required: true}
});

var Photo = mongoose.model('Photo', PhotoSchema);
module.exports = {Photo: Photo};;
