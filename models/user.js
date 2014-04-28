var schema = require('../schema');

var UserModel = schema.mongoose.model('UserModel', schema.User, 'users');

module.exports = UserModel;

/*
module.exports.RetrieveAll = RetrieveAll;

function RetrieveAll(callback) {
	User.find({}, callback);
}
*/
