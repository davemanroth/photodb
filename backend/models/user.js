/**
 * User model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	join_date: {type: Date, default: Date.now},
	last_login: {type: Date, default: Date.now},
	email: {type: String, required: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	self_portrait: {type: String, default: '/assets/images/default_portrait.jpg'},
	bio: {type: String, required: false},
	groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
	critiques: [{type: String, ref: 'Photo'}],
	photos: [{type: String, ref: 'Photo'}],
	messages: [MessageSchema],
}, {collection: 'users'});

var MessageSchema = new Schema({
	from: {type: String, ref: 'User'},
	text: {type: String, required: true},
	date_sent: {type: Date, default: Date.now}
});

/*
 * Static method to push a group, photo, or critique id to the appropriate
 * array field in the User schema when new group/photo/critique document
 * created in mongodb
 */
UserSchema.statics.addToArray = function (arrayName, username, id) {
	this.find({username: username}, function (err, user) {
		if(!err) {
			user = user[0];
			pushToArray(arrayName, user, id);
			user.save(function (err, user) {
				if(!err) {
					console.log('User updated!');
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

/*
 * Determine the appropriate Array field and push new id into it
 */
var pushToArray = function (arrayName, user, id) {
	switch (arrayName) {
		case 'groups' :
			user.groups.push(id);
			break;
		case 'critiques' :
			user.critiques.push(id);
			break;
		case 'photos' :
			user.photos.push(id);
			break;
	}
}

var User = mongoose.model('User', UserSchema);
module.exports = {User: User};
