/**
 * User model
 */
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

var User = mongoose.model('User', UserSchema);
module.exports = {User: User};

/*
module.exports.RetrieveAll = RetrieveAll;

function RetrieveAll(callback) {
	User.find({}, callback);
}
*/
