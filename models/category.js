/**
 * group model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {type: String, required: true}
}, {collection: 'categories'});

var Category = mongoose.model('Category', CategorySchema);
module.exports = {Category: Category};
