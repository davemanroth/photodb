/**
 * group model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name : {type: String, required: true}
}, {collection: 'categories'});

var Category = mongoose.model('Category', CategorySchema);
var Filters = {
	cameras: [
		'Canon', 'Nikon', 'Sony', 'iPhone',
		'Leica', 'Fuji', 'Samsung', 'Nokia',
		'Fujitsu', 'Pentax', 'Sigma', 'Lumix',
		'Minolta', 'Kodak', 'Sanyo',
		'Olympus', 'Konica'],
	shutters: [
		'1/8000', '1/4000', '1/2000',
		'1/1000', '1/500', '1/125',
		'1/60', '1/30', '1/15', '1/8',
		'1/4', '1/2', '1', '2', '4', 
		'6', '8', '10+'],
	fstops: [
		'1', '1.2', '1.8', '2',
		'2.8', '4', '5.6', '8',
		'11', '16', '22+'],
	isos: [
		'50', '100', '200', '400',
		'800', '1600', '3200', '6400',
		'12800+']
};


module.exports = {Category: Category, Filters: Filters};
