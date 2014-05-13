/**
 * User router
 */
var User = require('../models/user').User;
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
	res.redirect('/');
}

exports.profile = function (req, res){
};

exports.signupForm = function (req, res) {
	res.render('signup', {title: 'User signup'});
};

exports.signupAction = function (req, res) {
	User.create({
		username: req.body.username,
		password: req.body.password,
		join_date: Date.now(),
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		bio: req.body.bio
	}, function (err, user) {
		  console.log(user);
			if (!err) {
				console.log("User created: " + user);
			}
			else {
				console.log(err);
			}
		}
	);
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

exports.profile = function (req, res) {
	var username = req.params.username;
	User.find({username: username}, function (err, user) {
		if(!err) {
			res.render('profile', {user: user[0]});
		}
		else {
			console.log(err);
		}
	});
}	
*/
