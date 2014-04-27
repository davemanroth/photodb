var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = new Schema({
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
});	

module.exports.mongoose = mongoose;
module.exports.SchemaUser = User;

mongoose.connect('mongodb://localhost/photodb');
