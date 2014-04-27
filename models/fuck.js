
exports.doSomething = function doSomething(callback) {
	var FuckTard = db.mongoose.model('Fuck');
	FuckTard.find({}, function(err, shit) {
		if(err) {
			console.log(err);
		}
		else {
			console.log('What the fuck!?');
			callback(shit);
		}
	});
};
