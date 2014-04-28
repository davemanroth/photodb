var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	join_date: {type: Date, required: true},
	email: {type: String, required: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	bio: {type: String, required: false},
	//groups: [groupSchema],
	//critiques: [critiqueSchema],
	//photos: [photoSchema]
}, {collection: 'users'});	

var CritiqueSchema = new Schema({
	userid: {type: String, required: true},
	photoid: {type: String, required: true},
	liked: {type: String, required: true},
	needs_work: {type: String, required: true},
	//details: [details]
}, {collection: 'critiques'});

var PhotoSchema = new Schema({
	title: {type: String, required: true},
	author: {type: String, required: true},
	path: {type: String, required: true},
	writeup: {type: String, required: true},
	date_uploaded: {type: Date, required: true},
	//tech: [],
	//critiques: [],
	restriction: {type: String, required: true},
	//category: [];
}, {collection: 'photos'});	

var GroupSchema = new Schema({
	name: {type: String, required: true},
	// members: []
}, {collection: 'groups'});

module.exports = {
	User: UserSchema,
	Critique: CritiqueSchema,
	Photo: PhotoSchema,
	Group: GroupSchema
};
