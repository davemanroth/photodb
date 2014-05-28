/**
 * critique model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CritiqueSchema = new Schema({
	userid: {type: Schema.Types.ObjectId, ref: 'User'},
	photoid: {type: String, ref: 'Photo'},
	date_posted: {type: Date, default: Date.now},
	like: {type: String, required: true},
	improved: {type: String, required: true},
	details: [DetailSchema]
}, {collection: 'critiques'});

// Subdocument for CritiqueSchema
var DetailSchema = new Schema({
	xCoord: {type: Number, required: true},
	yCoord: {type: Number, required: true},
	notes: {type: String, required: true}
});

var Critique = mongoose.model('Critique', CritiqueSchema);
module.exports = {Critique: Critique};
