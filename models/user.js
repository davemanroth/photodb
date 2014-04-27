var db = require('../db');
var User = mongoose.model('User', db.UserSchema, 'users');

/*
module.exports.RetrieveAll = RetrieveAll;

function RetrieveAll(callback) {
	User.find({}, callback);
}
*/
