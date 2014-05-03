var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	join_date: {type: Date, default: Date.now},
	email: {type: String, required: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	bio: {type: String, required: false},
	groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
	critiques: [{type: Schema.Types.ObjectId, ref: 'Critique'}],
	photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}],
}, {collection: 'users'});	

var CritiqueSchema = new Schema({
	userid: {type: Schema.Types.ObjectId, ref: 'User'},
	photoid: {type: Schema.Types.ObjectId, ref: 'Photo'},
	liked: {type: String, required: true},
	needs_work: {type: String, required: true},
	details: [DetailSchema]
}, {collection: 'critiques'});

// Subdocument for CritiqueSchema
var DetailSchema = new Schema({
	xCoord: {type: Number, required: true},
	yCoord: {type: Number, required: true},
	notes: {type: String, required: true}
});

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

var GroupSchema = new Schema({
	name: {type: String, required: true},
	created_by: {type: Schema.Types.ObjectId, ref:'User'},
	date_created: {type: Date, default: Date.now},
	members: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {collection: 'groups'});

module.exports = {
	User: UserSchema,
	Critique: CritiqueSchema,
	Photo: PhotoSchema,
	Group: GroupSchema
};
