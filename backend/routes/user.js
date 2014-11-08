/**
 * User router
 */
var User = require('../models/user').User;
var Group = require('../models/group').Group;
var Category = require('../models/category').Category;
var Filters = require('../models/category').Filters;
var gm = require('gm').subClass({ imageMagick: true });;
var fs = require('fs');

exports.login = function (req, res) {
	//console.log(req.body.username);
	User.find({
		username: req.body.username,
		password: req.body.password
	}, function (err, data) {
		if (!err) {
			if (data != '') {
				req.session.username = data[0].username;
				req.session.userid = data[0]._id;
			}
			res.json(data);
		}
		else {
			console.log('Error: ' + err);
		}
	});
}

exports.logout = function (req, res) {
	delete req.session.username;
	delete req.session.userid;
	req.session.username, req.session.userid = undefined;
	console.log('Logout initiated');
	res.json(true);
}

/*
exports.signupForm = function (req, res) {
	res.render('signup', {title: 'User signup'});
};
*/

exports.signupAction = function (req, res) {
	//console.log([req.files, req.body]);
	var pic = req.files.pic;
	var imgUrl = '/photo_uploads/profile_imgs/' + pic.name;
	var tmpPath = pic.path;
	var permPath = './frontend/public/' + imgUrl;
	
	var newUser = new User({
		username: req.body.username,
		password: req.body.password,
		join_date: Date.now(),
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		self_portrait: imgUrl,
		bio: req.body.bio
	});

	newUser.save( function (err, user) {
		if(!err) {
			console.log('New user added!');
		}
		else {
			console.log(err);
		}
	});

	fs.rename(tmpPath, permPath, function (err) {
		if (err) { next(err); console.log(err); }
		fs.unlink(tmpPath, function () {
			console.log('Image uploaded to ' + permPath);
		});
	});
	/*
	*/
}

/*
exports.allUsers = function (req, res) {
	User.find({}, function (err, users) {
		if(err) {
			console.log('Error: ' + err);
		}
		else {
			res.render('users', {users: users});
		}
	});
};
*/

/*
*/
exports.profile = function (req, res) {
	var username = req.params.username;
	User.find({username: username})
		  .populate('photos')
		  .populate('groups', 'name')
			.exec(function (err, user) {
		if(!err) {
			res.json({user: user[0], filters:Filters});
		}
		else {
			console.log(err);
		}
	});
}	
