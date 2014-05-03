/**
 * group model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	name: {type: String, required: true},
	created_by: {type: Schema.Types.ObjectId, ref:'User'},
	date_created: {type: Date, default: Date.now},
	members: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {collection: 'groups'});

var Group = mongoose.model('Group', GroupSchema);
module.exports = {Group: Group};
