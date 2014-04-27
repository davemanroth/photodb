var db = require('../db');
var User = db.mongoose.model('User', db.SchemaUser);

module.exports.RetrieveAll = RetrieveAll;

function RetrieveAll(callback) {
	User.find({}, callback);
}
